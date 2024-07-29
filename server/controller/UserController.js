const User = require('../models/user.model');
const ApiResponse = require('../utils/ApiResponse');
const SendEmail = require('../utils/sendSms'); // Ensure this is correctly named and used
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const cron = require('node-cron');
const SendToken = require('../utils/SendToken');

exports.DeleteUnVerifiedUser = () => {
    cron.schedule('*/30 0 * * *', async () => {
        try {
            // Find users who have not verified their email in the 30  Minutes 
            const users = await User.find({
                isEmailVerified: false,
                otpExpiresAt: { $lt: new Date(Date.now()) } // Users whose OTP has expired
            });

            // Delete these users
            for (const user of users) {
                await User.findByIdAndDelete(user._id);
            }

            console.log('Unverified users deleted successfully.');
        } catch (error) {
            console.error('Error deleting unverified users:', error);
        }
    });
}

exports.register = async (req, res) => {
    try {
        const { Email, FullName, Password, ContactNumber } = req.body;

        // Validate required fields
        const missingFields = [];
        if (!Email) missingFields.push('Email');
        if (!FullName) missingFields.push('Full Name');
        if (!Password) missingFields.push('Password');
        if (!ContactNumber) missingFields.push('Contact Number');
        if (missingFields.length > 0) {
            return ApiResponse.error(res, 'Missing required fields', 400, missingFields);
        }

        // Check if the user already exists with the same email or contact number
        const existingUser = await User.findOne({
            $or: [
                { Email: Email },
                { ContactNumber: ContactNumber }
            ]
        });

        const otpValidityMinutes = 30; // Set OTP validity period in minutes

        if (existingUser) {
            if (existingUser.isEmailVerified) {
                return ApiResponse.error(res, 'User already exists with this email or contact number', 400);
            } else {
                // Resend verification email
                const otp = otpGenerator.generate(6, { digits: true, upperCase: false, specialChars: false });
                existingUser.EmailVerifiedOtp = otp;
                existingUser.otpExpiresAt = new Date(Date.now() + otpValidityMinutes * 60 * 1000); // Set OTP expiration time
                await existingUser.save();
                const options = {
                    Email: existingUser.Email,
                    subject: 'Re-Email Verification',
                    message: `
                        <html>
                        <head>
                            <style>
                                .button {
                                    display: inline-block;
                                    padding: 10px 20px;
                                    font-size: 16px;
                                    color: #fff;
                                    background-color: #007bff;
                                    text-decoration: none;
                                    border-radius: 5px;
                                }
                                .container {
                                    font-family: Arial, sans-serif;
                                    padding: 20px;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <p>Welcome back, ${existingUser.FullName}!</p>
                                <p>Your OTP for Re-Email verification is: <strong>${otp}</strong></p>
                                <p>If you do not verify your email within 30 minutes, your account will be deleted.</p>
                                <a href=${process.env.DOMAIN}/verify-email?otp=${otp}" class="button">Verify Email</a>
                            </div>
                        </body>
                        </html>
                    `

                }
                await SendEmail(options)


                return ApiResponse.success(res, existingUser, "User Already Registered with This Email. Email Verification Pending. Please Verify the OTP.", 200);
            }
        }

        // Create a new user
        const hashedPassword = await bcrypt.hash(Password, 10);
        const newUser = new User({
            Email,
            FullName,
            Password: hashedPassword,
            Contact: ContactNumber,
            EmailVerifiedOtp: otpGenerator.generate(6, { digits: true, upperCase: false, specialChars: false }),
            otpExpiresAt: new Date(Date.now() + otpValidityMinutes * 60 * 1000) // Set OTP expiration time
        });
        await newUser.save();

        // Send verification email
        await SendEmail({
            Email: newUser.Email,
            subject: 'Email Verification',
            message: `
                <html>
                <head>
                    <style>
                        .button {
                            display: inline-block;
                            padding: 10px 20px;
                            font-size: 16px;
                            color: #fff;
                            background-color: #007bff;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                        .container {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                        }
                    </style>
                </head>
                <body>
                 <div class="container">
    <p>Hello ${FullName},</p>
    <p>Thank you for registering. Your OTP for email verification is: <strong>${newUser.EmailVerifiedOtp}</strong></p>
    <p>This OTP is valid for 30 minutes. If you do not verify your email within this time, your account will be automatically deleted.</p>
    <a href="${process.env.DOMAIN}/verify-email?otp=${otp}" class="button">Verify Email</a>
</div>

                </body>
                </html>
            `
        });

        return ApiResponse.success(res, newUser, 'User registered successfully. Please verify your email', 201);

    } catch (error) {
        if (error.code === 11000) {
            const duplicateKey = Object.keys(error.keyPattern)[0];
            let errorMessage;

            switch (duplicateKey) {
                case 'Email':
                    errorMessage = 'This email is already registered. Please use a different email.';
                    break;
                case 'Contact':
                    errorMessage = 'This contact number is already registered. Please use a different contact number.';
                    break;
                default:
                    errorMessage = 'Duplicate value error.';
            }

            return ApiResponse.error(res, errorMessage, 400);
        }

        // Log the error for debugging purposes
        console.log(error);
        return ApiResponse.error(res, 'Internal Server Error', 500, [error.message]);
    }
};
exports.VerifyOtp = async (req, res) => {
    try {
        const { Email, Otp,Password } = req.body;

        if (!Email || !Otp) {
            return ApiResponse.error(res, 'OTP is required for verification', 402);
        }

        // Check user
        const CheckUser = await User.findOne({ Email });
        if (!CheckUser) {
            return ApiResponse.error(res, 'User with this email is not present', 401);
        }

        if (CheckUser.isEmailVerified) {
            return ApiResponse.error(res, 'User email is already verified', 403);
        }

        if (CheckUser.EmailVerifiedOtp !== Otp) {
            return ApiResponse.error(res, 'Invalid OTP', 403);
        }

        if (CheckUser.otpExpiresAt < new Date()) {
            return ApiResponse.error(res, 'OTP has expired', 403);
        }

        // Update user verification status
        CheckUser.Password = Password
        CheckUser.isEmailVerified = true;
        CheckUser.EmailVerifiedOtp = null; // Clear the OTP
        CheckUser.otpExpiresAt = null; // Clear the OTP expiry
        await CheckUser.save();

        // Send token to user
        await SendToken(CheckUser, res, 201);
    } catch (error) {
        return ApiResponse.error(res, 'Internal Server Error', 500, [error.message]);
    }
};

exports.login = async (req, res) => {
    console.log("I am Hits")
    try {
        const { Email, Password } = req.body;
        // console.log("bodty",req.body)
        if (!Email) {
            return ApiResponse.error(res, 'Please Enter An Email', 402);
        }
        if (!Password) {
            return ApiResponse.error(res, 'Please Enter A Password', 402);
        }

        // Check user
        const checkUser = await User.findOne({ Email });
        if (!checkUser) {
            return ApiResponse.error(res, 'No account found with this email address. Please sign up.', 401);
        }
        

        if (checkUser.isEmailVerified === false) {
            const otpValidityMinutes = 30
            const otp = otpGenerator.generate(6, { digits: true, upperCase: false, specialChars: false });
            checkUser.EmailVerifiedOtp = otp;
            checkUser.otpExpiresAt = new Date(Date.now() + otpValidityMinutes * 60 * 1000); // Set OTP expiration time
            await checkUser.save();
            const options = {
                Email: checkUser.Email,
                subject: 'Re-Email Verification',
                message: `
                    <html>
                    <head>
                        <style>
                            .button {
                                display: inline-block;
                                padding: 10px 20px;
                                font-size: 16px;
                                color: #fff;
                                background-color: #007bff;
                                text-decoration: none;
                                border-radius: 5px;
                            }
                            .container {
                                font-family: Arial, sans-serif;
                                padding: 20px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <p>Welcome back, ${checkUser.FullName}!</p>
                            <p>Your OTP for Re-Email verification is: <strong>${otp}</strong></p>
                            <p>If you do not verify your email within 30 minutes, your account will be deleted.</p>
                            <a href="${process.env.DOMAIN}/verify-email?otp=${otp}" class="button">Verify Email</a>
                        </div>
                    </body>
                    </html>
                `
            };
            await SendEmail(options);
            return ApiResponse.success(res, checkUser, "User Email Verification Pending. Please Verify the OTP For Login.", 403);
        } else {
            const isPasswordMatch = await checkUser.comparePassword(Password);
            if (!isPasswordMatch) {
                return ApiResponse.error(res, 'Invalid Password', 401);
            } else {
                await SendToken(checkUser, res, 201);
            }
        }
    } catch (error) {
        console.log(error)
        return ApiResponse.error(res, 'Internal Server Error', 500, [error.message]);
    }
};


exports.GetMyDetails = async(req,res)=>{
    try {
        const user = req.user.id

        if(!user){
            return ApiResponse.error(res, 'Please login to access', 401);
        }
        const UserCheck= await User.findById(user).select('-Password')
        if(!UserCheck){
            return ApiResponse.error(res, 'User Not Found', 401);
        }
        res.status(201).json({
            success:true,
            message:"User Found",
            data:UserCheck
        })
    } catch (error) {
        return ApiResponse.error(res, 'An error occurred while retrieving user details', 500, error);
    }
}
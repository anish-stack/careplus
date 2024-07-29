const user = require('../models/user.model')
const PatientInfo = require('../models/PatientInfo.model')
const ApiResponse = require('../utils/ApiResponse')
const SendEmail = require('../utils/sendSms')
const otpGenerator = require('otp-generator');
exports.AddPatientInfo = async (req, res) => {
    try {
        const { personalInformation, medicalInformation } = req.body;
        const userID = req.user.id;

        // Check if user exists
        const UserCheck = await user.findById(userID);
        if (!UserCheck) {
            return ApiResponse.error(res, 'User Not Found', 401);
        }

        if (!personalInformation || !medicalInformation) {
            return ApiResponse.error(res, 'Please Fill All Required Fields', 403);
        }

        // Generate unique PatientId starting with 'CAPLUS' and followed by a number
        const getNextPatientId = async () => {
            try {
                // Find the most recent patient document based on PatientId
                const lastPatient = await PatientInfo.findOne().sort({ 'personalInformation.PatientId': -1 }).exec();

                // If no patient exists, return the initial PatientId
                if (!lastPatient || !lastPatient.personalInformation.PatientId) {
                    return 'CAPLUS00001';
                }

                // Extract the numeric part from the last PatientId
                const lastIdNumber = parseInt(lastPatient.personalInformation.PatientId.replace('CAPLUS', ''), 10) || 0;
                const nextIdNumber = lastIdNumber + 1;

                // Return the next PatientId with proper padding
                return `CAPLUS${nextIdNumber.toString().padStart(5, '0')}`;
            } catch (error) {
                console.error('Error generating next PatientId:', error);
                throw error; // Rethrow the error after logging it
            }
        };


        const uniquePatientId = await getNextPatientId();

        // Add PatientId to personalInformation
        UserCheck.PatientId = uniquePatientId;

        const newPatient = new PatientInfo({
            personalInformation: {
                ...personalInformation,
                userId: req.user.id
            },
            medicalInformation
        });

        await newPatient.save();
        await UserCheck.save()
        // Send HTML email notification
        const emailHtml = `
        <html>
        <head>
            <style>
                body {
                    font-family: 'Helvetica Neue', Arial, sans-serif;
                    background-color: #1a1a1a;
                    color: #e0e0e0;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    background-color: #2c2c2c;
                    border-radius: 10px;
                    padding: 20px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                    max-width: 600px;
                    margin: 20px auto;
                    color: #e0e0e0;
                }
                .header {
                    background-color: #333;
                    color: #ffffff;
                    padding: 15px;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                    font-size: 24px;
                    font-weight: bold;
                }
                .content {
                    margin: 20px 0;
                    line-height: 1.6;
                }
                .footer {
                    margin-top: 20px;
                    text-align: center;
                    color: #b3b3b3;
                    font-size: 14px;
                }
                .footer a {
                    color: #4a90e2;
                    text-decoration: none;
                }
                .footer a:hover {
                    text-decoration: underline;
                }
                .icon {
                    font-size: 18px;
                    color: #4a90e2;
                    margin-right: 8px;
                }
            </style>
            <!-- FontAwesome CDN -->
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <i class="fas fa-stethoscope icon"></i> Welcome to Your Healthcare
                </div>
                <div class="content">
                    <p>Dear ${personalInformation.FullName},</p>
                    <p>We are excited to inform you that your patient information has been successfully added to our system.</p>
                    <p><strong>Your Patient ID:</strong> ${uniquePatientId}</p>
                    <p>If you have any questions or need further assistance, feel free to <a href="mailto:support@yourhealthcare.com"><i class="fas fa-envelope icon"></i> contact us</a>.</p>
                    <p>Best Regards,<br>Your Healthcare Team</p>
                </div>
                <div class="footer">
                    &copy; ${new Date().getFullYear()} CarePlus ➕ Healthcare Team | <a href="http://www.yourhealthcare.com"><i class="fas fa-globe icon"></i> Visit our website</a>
                </div>
            </div>
        </body>
        </html>
    `;
    

        await SendEmail({
            Email: personalInformation.Email,
            subject: 'Patient Information Added Successfully',
            message: emailHtml
        });

        // Send a user-friendly response
        ApiResponse.success(res, newPatient, 'Patient information added successfully.');

    } catch (error) {
        console.log(error)
        if (error.code === 11000) {
            return ApiResponse.error(res, 'Email already exists. Please use a different email.', 403);
        }
        ApiResponse.error(res, 'Error adding patient information.', 500, error);
    }
};



exports.EditDetails = async (req, res) => {
    try {

    } catch (error) {

    }
}

exports.getMyDetailsPatientInfo = async (req, res) => {
    try {

    } catch (error) {

    }
}
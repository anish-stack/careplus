const jwt = require('jsonwebtoken');

const SendToken = async (user, res, status) => {
    try {
        // Create JWT token with user id and secret key
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_SECRET_EXPIRES
        });

        // Set cookie options
        const option = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' // Secure cookie only in production
        };

        // Set the token as a cookie and return response
        res.status(status).cookie('token', token, option).json({
            success: true,
            token,
            user: {
                id: user._id,
                email: user.Email,
                name: user.FullName,
                Contact: user.Contact,
                isEmailVerified: user.isEmailVerified,
                PatientId:user?.PatientId || null
            }
        });
    } catch (error) {
        // Handle any errors
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = SendToken;
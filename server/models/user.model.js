const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: [true, "Please Give Your Full Name"],
        trim: true,
    },
    Email: {
        type: String,
        required: [true, "Please Give Your Valid Email"],
        trim: true,
        unique: true
    },
    Contact: {
        type: Number,
        required: [true, "Please Give Your Valid Contact Number"],
        trim: true,
        unique: true
    },
    Password: {
        type: String,
        required: [true, "Please Give Your Password"],
        trim: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    EmailVerifiedOtp: {
        type: String
    },
    PasswordResetVerifiedOtp: {
        type: Number
    },
    otpExpiresAt:{
        type:String
    },
    PatientId: {
        type: String
    }
}, { timestamps: true });

// Indexes
UserSchema.index({ Email: 1 });
UserSchema.index({ Contact: 1 });

// Pre-save hook to hash the password before saving
UserSchema.pre('save', async function (next) {
    if (this.isModified('Password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.Password = await bcrypt.hash(this.Password, salt);
            next();
        } catch (error) {
            next(error);
        }
    } else {
        return next();
    }
});

// Method to compare password for login
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.Password);
};

// Export the User model
module.exports = mongoose.model('User', UserSchema);

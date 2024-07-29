const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    personalInformation: {
        FullName: { type: String, required: true },
        Email: { type: String, required: true, unique: true },
        ContactNumber: { type: String, required: true },
        DateOfBirth: { type: Date, required: true },
        Gender: { type: String, required: true },
        Address: { type: String, required: true },
        Occupation: { type: String, required: true },
        EmergencyContactName: { type: String, required: true },
        EmergencyContactNumber: { type: String, required: true },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    },
    medicalInformation: {
        InsuranceProvider: { type: String, required: true },
        InsurancePolicyNumber: { type: String, required: true },
        Allergies: { type: [String], default: [] }, // Array of strings
        CurrentMedications: { type: [String], default: [] }, // Array of strings
        FamilyMedicalHistory: { type: String, required: true },
        PastMedicalHistory: { type: String, required: true },
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Patient', PatientSchema);

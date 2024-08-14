import mongoose from 'mongoose';

// Define schema
const warrantSchema = new mongoose.Schema({
    warrantNo: {
        type: String, // Ensure this is String
        required: [true, 'Warrant number is required']
    },
    warrantType: {
        type: String,
        required: [true, 'Warrant type is required']
    },
    accusedName: {
        type: String,
        required: [true, 'Accused name is required']
    },
    aadharNo: {
        type: Number, // Ensure this is String
        required: [true, 'Aadhar number is required']
    },
    details: {
        type: String,
        required: [true, 'Details are required']
    },
    pincode: {
        type: String, // Ensure this is String
        required: [true, 'Pincode is required']
    },
    policeStationId: {
        type: String, // Ensure this is String
        required: [true, 'Police station ID is required']
    },
    status: {
        type: String,
        default: 'Pending'
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    }
});


const firSchema = new mongoose.Schema({
    firNo: { type: String, required: true },
    accusedName: { type: String, required: true },
    aadharNo: { type: Number, required: true },
    details: { type: String, required: true },
    pincode: { type: Number, required: true },
    policeStationId: { type: String,  required: true },
    status: { type: String, default: 'Pending' },
    address: { type: String, required: true }
});



const UserWarrantSchema = new mongoose.Schema({
    warrantNo: {
        type: String,
        required: true,
        unique: true, // Ensures that each warrant number is unique
    },
    warrantType: {
        type: String,
        required: true,
        // Define warrant types as needed
    },
    accusedName: {
        type: String,
        required: true,
    },
    aadharNo: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        
    },
    issueDate: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {
    timestamps: true
});

export const UserWarrant = mongoose.models.UserWarrant || mongoose.model('UserWarrant', UserWarrantSchema);

 

// Use a dynamic model name to avoid recompilation issues

export const Warrant = mongoose.models.Warrant || mongoose.model('Warrant', warrantSchema);
export const FIR=mongoose.models.FIR || mongoose.model('FIR', firSchema);


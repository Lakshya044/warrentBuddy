import mongoose from 'mongoose';
const bailSchema = new mongoose.Schema({
    aadharNo: {
        type: Number,
        required: true,
        unique: true
    },
    accusedName: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    }
}, { timestamps: true });

const Bail = mongoose.models.Bail || mongoose.model('Bail', bailSchema);

export { Bail };
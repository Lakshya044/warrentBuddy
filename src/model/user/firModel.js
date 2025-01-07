import mongoose from 'mongoose';
const firSchema = new mongoose.Schema({
  firNo: {
    type: String,
    required: true,
  },
  accusedName: {
    type: String,
    required: true,
  },
  aadharNo: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  policeStationId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  address: {
    type: String,
    required: true,
  },
});

export const FIR=mongoose.models.FIR || mongoose.model('FIR', firSchema);

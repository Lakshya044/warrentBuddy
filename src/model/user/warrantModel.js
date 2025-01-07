import mongoose from 'mongoose';
const WarrantSchema = new mongoose.Schema({
  warrantNo: {
    type: String,
    required: [true, 'Warrant number is required'],
    unique: true,
  },
  warrantType: {
    type: String,
    required: [true, 'Warrant type is required'],
    enum: ['Arrest Warrant', 'Search Warrant'],
  },
  accusedName: {
    type: String,
    required: [true, 'Accused name is required'],
  },
  aadharNo: {
    type: String,
    required: [true, 'Aadhar number is required'],
  },
  details: {
    type: String,
    required: [true, 'Details are required'],
  },
  pincode: {
    type: String,
  },
  policeStationId: {
    type: String,
    required: [true, 'Police station ID is required'],
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Persued'],
  },
  address: {
    type: String,
  },
  issueDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  visibleToUser: {  
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

WarrantSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { _id: 'warrantNo' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      this.warrantNo = counter.sequence_value.toString();
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, 
  sequence_value: { type: Number, default: 0 },  
});

const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);
// moduleexports = Counter;


export const Warrant = mongoose.models.Warrant || mongoose.model('WarrantSchema', WarrantSchema);

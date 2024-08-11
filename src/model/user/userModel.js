import mongoose from 'mongoose';

// Schema for Clients
const ClientSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: Number, default: 4 } // Default role for clients
});

// Schema for Police
const PoliceSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    policeId: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: Number, default: 2 } // Default role for police
});

// Schema for Judges
const JudgeSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    judgeId: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: Number, default: 1 } // Default role for judges
});

// Export the models
export const Client = mongoose.models.Client || mongoose.model('Client', ClientSchema);
export const Police = mongoose.models.Police || mongoose.model('Police', PoliceSchema);
export const Judge = mongoose.models.Judge || mongoose.model('Judge', JudgeSchema);

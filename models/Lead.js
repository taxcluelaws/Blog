import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  service: String,
  message: String,
  source: { type: String, default: 'website' },
  status: { type: String, enum: ['New', 'Contacted', 'Converted'], default: 'New' }
}, { timestamps: true });

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);

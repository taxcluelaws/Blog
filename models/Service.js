import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  overview: String,
  eligibility: String,
  documentsRequired: [String],
  processSteps: [String],
  pricing: String,
  faqs: [{ question: String, answer: String }],
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);

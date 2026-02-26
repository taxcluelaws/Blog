import mongoose from 'mongoose';

const FAQSchema = new mongoose.Schema({
  question: String,
  answer: String,
  scope: { type: String, enum: ['home', 'service'], default: 'home' },
  serviceSlug: String
}, { timestamps: true });

export default mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);

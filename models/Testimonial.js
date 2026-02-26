import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: String,
  company: String,
  feedback: String,
  rating: { type: Number, min: 1, max: 5, default: 5 }
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);

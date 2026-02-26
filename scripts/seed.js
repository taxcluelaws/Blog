const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI;

const serviceSchema = new mongoose.Schema({ title:String, slug:String, overview:String, eligibility:String, documentsRequired:[String], processSteps:[String], pricing:String, faqs:[{question:String,answer:String}] });
const blogSchema = new mongoose.Schema({ title:String, slug:String, content:String, metaDescription:String, category:String, published:Boolean });
const testimonialSchema = new mongoose.Schema({ name:String, company:String, feedback:String, rating:Number });
const userSchema = new mongoose.Schema({ name:String, email:String, password:String, role:String });

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);
const User = mongoose.models.User || mongoose.model('User', userSchema);

const services = [
'Private Limited Company Registration','LLP Registration','OPC Registration','GST Registration','FSSAI License','BIS Certification','CDSCO / Medical Device Registration','Import Export Code (IEC)','Trademark Registration','Startup India Registration','Annual Compliance Services'
].map((title)=>({title,slug:title.toLowerCase().replace(/[^a-z0-9]+/g,'-'),overview:`Professional ${title} support for Indian businesses with legal accuracy and timely filings.`,eligibility:'Based on entity structure and activity; our advisors validate before filing.',documentsRequired:['PAN','Aadhaar','Address Proof','Business Proof'],processSteps:['Consultation call','Document collection','Govt filing and approval'],pricing:'Starts from ₹2,999 + government fees',faqs:[{question:'How long does this take?',answer:'Most applications are completed in 7-15 working days based on department timelines.'}]}));

(async()=>{
  await mongoose.connect(MONGODB_URI);
  await Service.deleteMany({});
  await Blog.deleteMany({});
  await Testimonial.deleteMany({});
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'StrongPassword@123', 10);
  await User.updateOne({ email: process.env.ADMIN_EMAIL || 'admin@taxclue.net' }, { name: 'TaxClue Admin', email: process.env.ADMIN_EMAIL || 'admin@taxclue.net', password, role: 'admin' }, { upsert: true });
  await Service.insertMany(services);
  await Blog.insertMany([
    { title: 'GST Registration for New Businesses in India', slug: 'gst-registration-for-new-businesses-in-india', content: '<p>GST registration is mandatory based on turnover and interstate supply conditions...</p>', metaDescription: 'Understand GST registration eligibility, documents and timelines for Indian startups.', category: 'GST', published: true },
    { title: 'Private Limited Company vs LLP: What to Choose?', slug: 'private-limited-company-vs-llp-what-to-choose', content: '<p>Choosing between Pvt Ltd and LLP depends on funding plans, ownership and compliance...</p>', metaDescription: 'Compare Private Limited Company and LLP for compliance, cost and growth.', category: 'Incorporation', published: true }
  ]);
  await Testimonial.insertMany([
    { name: 'Rohan Mehta', company: 'Finova Traders', feedback: 'TaxClue made our GST and IEC registrations smooth and fast.', rating: 5 },
    { name: 'Priya Sharma', company: 'NutriKart Foods', feedback: 'Very reliable team for FSSAI and annual filings.', rating: 5 }
  ]);
  console.log('Seed complete');
  process.exit(0);
})();

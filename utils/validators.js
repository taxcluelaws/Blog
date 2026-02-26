import validator from 'validator';

export const isIndianPhone = (phone) => /^(?:\+91|91)?[6-9]\d{9}$/.test(phone || '');

export const validateLead = ({ name, email, phone, message }) => {
  if (!name || name.length < 2) return 'Name is required';
  if (email && !validator.isEmail(email)) return 'Invalid email';
  if (!isIndianPhone(phone)) return 'Invalid Indian phone number';
  if (!message || message.length < 10) return 'Please share requirement details';
  return null;
};

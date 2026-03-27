export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(price);
};

export const calculateDiscount = (originalPrice, discountPercent) => {
  return originalPrice - (originalPrice * discountPercent) / 100;
};

export const calculateTax = (price, taxPercent = 18) => {
  return (price * taxPercent) / 100;
};

export const truncateText = (text, length = 50) => {
  if (text.length > length) {
    return text.substring(0, length) + '...';
  }
  return text;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const getInitials = (firstName, lastName) => {
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
};

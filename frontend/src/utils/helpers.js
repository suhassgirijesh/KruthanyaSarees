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

export const parseImageInput = (value) => {
  if (!value) return [];

  const entries = value.split(',').map((item) => item.trim());
  const results = [];
  let pendingPrefix = '';

  entries.forEach((entry) => {
    if (!entry) return;

    if (pendingPrefix) {
      results.push(`${pendingPrefix},${entry}`);
      pendingPrefix = '';
      return;
    }

    if (entry.startsWith('data:image') && !entry.includes('base64,')) {
      pendingPrefix = entry;
      return;
    }

    results.push(entry);
  });

  if (pendingPrefix) {
    results.push(pendingPrefix);
  }

  return results.filter(Boolean);
};

export const normalizeImageEntries = (images) => {
  if (!images) return [];
  if (!Array.isArray(images)) return [images];

  const normalized = [];
  let i = 0;

  while (i < images.length) {
    const current = images[i];
    const next = images[i + 1];

    if (
      typeof current === 'string' &&
      current.startsWith('data:image') &&
      !current.includes('base64,') &&
      typeof next === 'string'
    ) {
      normalized.push(`${current},${next}`);
      i += 2;
      continue;
    }

    normalized.push(current);
    i += 1;
  }

  return normalized.filter(Boolean);
};

export const getInitials = (firstName, lastName) => {
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
};

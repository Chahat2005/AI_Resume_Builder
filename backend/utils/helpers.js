// Utility: Generate unique ID
const generateID = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Utility: Format date for display
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Utility: Truncate text
const truncateText = (text, maxLength = 100) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

// Utility: Deep clone object
const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

module.exports = { generateID, formatDate, truncateText, deepClone };

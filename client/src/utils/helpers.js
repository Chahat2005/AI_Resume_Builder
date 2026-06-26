// Utility: Format date to readable format
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Utility: Handle API error responses
export const getErrorMessage = (error) => {
  return error?.response?.data?.error || error?.message || 'An error occurred.';
};

// Utility: Sanitize HTML
export const sanitizeHTML = (html) => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

// Utility: Generate unique ID
export const generateID = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Utility: Check if email is valid
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Utility: Truncate text
export const truncateText = (text, maxLength = 50) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

// Utility: Download PDF
export const downloadPDF = (content, filename = 'resume.pdf') => {
  const element = document.createElement('a');
  element.href = content;
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

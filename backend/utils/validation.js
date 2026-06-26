// Utility: Validate email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Utility: Validate password strength
const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Utility: Validate URL format
const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = { validateEmail, validatePassword, validateURL };

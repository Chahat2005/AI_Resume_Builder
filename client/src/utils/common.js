// Utility: Check if user is authenticated
export const isAuthenticatedUser = (user) => {
  return user && user.id && user.email;
};

// Utility: Extract error message from Axios response
export const extractErrorMessage = (error) => {
  if (error.response && error.response.data && error.response.data.error) {
    return error.response.data.error;
  }
  return error.message || 'An unexpected error occurred';
};

// Utility: Format date to DD/MM/YYYY
export const formatDateDMY = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-GB');
};

// Utility: Format date to MM/DD/YYYY
export const formatDateMDY = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US');
};

// Utility: Get initials from name
export const getInitials = (name) => {
  return name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
};

// Utility: Check if URL is valid
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Utility: Debounce function for search input
export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Utility: Get file extension from filename
export const getFileExtension = (filename) => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

import { useCallback } from 'react';

export const useValidation = () => {
  const validateEmail = useCallback((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validatePassword = useCallback((password) => {
    return password.length >= 6;
  }, []);

  const validateName = useCallback((name) => {
    return name.trim().length >= 2;
  }, []);

  return { validateEmail, validatePassword, validateName };
};

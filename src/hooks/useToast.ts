import { useState, useEffect } from 'react';

export const useToast = () => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const showSuccessToast = () => {
    setShowToast(true);
  };

  return {
    showToast,
    showSuccessToast,
  };
};
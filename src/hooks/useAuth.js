import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateSession, checkTokenExpiry, refreshToken } from '../../store/authSlice';

/**
 * Custom hook for managing authentication state with incognito mode support
 * Handles automatic token validation, refresh, and cleanup
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    // Initial session validation
    dispatch(validateSession());

    // Set up periodic token expiry checks
    const tokenCheckInterval = setInterval(() => {
      dispatch(checkTokenExpiry());
    }, 30000); // Check every 30 seconds

    // Handle beforeunload event to clear session data if needed
    const handleBeforeUnload = () => {
      // Only clear sessionStorage if we're in incognito mode
      // In normal mode, keep localStorage for persistence
      try {
        const isIncognito = !window.localStorage || 
          (window.localStorage && window.localStorage.length === 0);
        
        if (isIncognito) {
          sessionStorage.clear();
        }
      } catch (error) {
        // Likely incognito mode or storage disabled
        sessionStorage.clear();
      }
    };

    // Handle storage events for multi-tab synchronization
    const handleStorageChange = (event) => {
      if (event.key === 'authToken' || event.key === 'authUser') {
        dispatch(validateSession());
      }
    };

    // Handle visibility change to validate session when tab becomes active
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        dispatch(validateSession());
        dispatch(checkTokenExpiry());
      }
    };

    // Handle focus to revalidate session
    const handleFocus = () => {
      dispatch(validateSession());
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    // Cleanup
    return () => {
      clearInterval(tokenCheckInterval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [dispatch]);

  // Auto-refresh token when it's about to expire
  useEffect(() => {
    if (authState.token && authState.tokenExpiry) {
      const timeUntilExpiry = authState.tokenExpiry - Date.now();
      const refreshThreshold = 5 * 60 * 1000; // 5 minutes before expiry

      if (timeUntilExpiry < refreshThreshold && timeUntilExpiry > 0) {
        dispatch(refreshToken());
      }
    }
  }, [authState.token, authState.tokenExpiry, dispatch]);

  return {
    ...authState,
    isTokenValid: authState.token && authState.tokenExpiry && Date.now() < authState.tokenExpiry,
    timeUntilExpiry: authState.tokenExpiry ? authState.tokenExpiry - Date.now() : 0,
  };
};

/**
 * Helper function to check if browser is in incognito/private mode
 */
export const isIncognitoMode = () => {
  return new Promise((resolve) => {
    try {
      // Try to use localStorage
      const testKey = '__incognito_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      resolve(false); // Not incognito
    } catch (error) {
      resolve(true); // Likely incognito
    }
  });
};

/**
 * Helper function to get storage mechanism based on browser mode
 */
export const getAvailableStorage = () => {
  try {
    // Test localStorage availability
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return 'localStorage';
  } catch (error) {
    // localStorage not available, use sessionStorage
    try {
      const testKey = '__storage_test__';
      sessionStorage.setItem(testKey, 'test');
      sessionStorage.removeItem(testKey);
      return 'sessionStorage';
    } catch (sessionError) {
      return 'none';
    }
  }
};

export default useAuth;

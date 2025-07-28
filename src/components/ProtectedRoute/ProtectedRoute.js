import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { validateSession, checkTokenExpiry } from '../../store/authSlice';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, loading, token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Validate session on component mount
    dispatch(validateSession());
    
    // Check token expiry
    dispatch(checkTokenExpiry());
    
    // Set up interval to check token expiry every minute
    const tokenCheckInterval = setInterval(() => {
      dispatch(checkTokenExpiry());
    }, 60000); // Check every minute

    // Cleanup interval on unmount
    return () => clearInterval(tokenCheckInterval);
  }, [dispatch]);

  // Handle browser storage events (for multi-tab sync)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'authToken' || event.key === 'authUser') {
        // Re-validate session when storage changes
        dispatch(validateSession());
      }
    };

    // Listen for storage changes (works across tabs)
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for session storage changes in the same tab
    const handleSessionStorageChange = () => {
      dispatch(validateSession());
    };

    // Custom event for session storage changes
    window.addEventListener('sessionStorageChange', handleSessionStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('sessionStorageChange', handleSessionStorageChange);
    };
  }, [dispatch]);

  // Handle visibility change (when user switches tabs or browser loses focus)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // When tab becomes visible again, check token validity
        dispatch(validateSession());
        dispatch(checkTokenExpiry());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [dispatch]);

  // Handle page focus (when user returns to the tab)
  useEffect(() => {
    const handleFocus = () => {
      dispatch(validateSession());
      dispatch(checkTokenExpiry());
    };

    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        color: '#64748b',
        fontSize: '18px',
        fontWeight: '500'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '20px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          Validating session...
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !token) {
    // Redirect to login page, but preserve the intended destination
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

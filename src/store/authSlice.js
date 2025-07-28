import { createSlice } from '@reduxjs/toolkit';

// Utility functions for token management
const getStoredToken = () => {
  try {
    // Try sessionStorage first (works in incognito mode)
    const sessionToken = sessionStorage.getItem('authToken');
    if (sessionToken) return sessionToken;
    
    // Fallback to localStorage if available
    const localToken = localStorage.getItem('authToken');
    return localToken;
  } catch (error) {
    console.warn('Storage not available:', error);
    return null;
  }
};

const getStoredUser = () => {
  try {
    // Try sessionStorage first (works in incognito mode)
    const sessionUser = sessionStorage.getItem('authUser');
    if (sessionUser) return JSON.parse(sessionUser);
    
    // Fallback to localStorage if available
    const localUser = localStorage.getItem('authUser');
    return localUser ? JSON.parse(localUser) : null;
  } catch (error) {
    console.warn('Storage not available or corrupted:', error);
    return null;
  }
};

const storeAuthData = (token, user) => {
  try {
    // Store in sessionStorage first (always works, even in incognito)
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('authUser', JSON.stringify(user));
    
    // Also try localStorage for persistence across sessions (if not incognito)
    try {
      localStorage.setItem('authToken', token);
      localStorage.setItem('authUser', JSON.stringify(user));
    } catch (localError) {
      // localStorage might be disabled in incognito, but that's okay
      console.info('localStorage not available, using sessionStorage only');
    }
  } catch (error) {
    console.warn('Unable to store auth data:', error);
  }
};

const clearAuthData = () => {
  try {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  } catch (error) {
    console.warn('Error clearing auth data:', error);
  }
};

// Generate a secure session token
const generateSessionToken = (email) => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  const base = btoa(`${email}:${timestamp}:${random}`);
  return `admin_${base}_${timestamp}`;
};

const initialState = {
  isAuthenticated: !!getStoredToken(),
  user: getStoredUser(),
  token: getStoredToken(),
  tokenExpiry: null,
  loading: false,
  error: null,
  sessionId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { user, rememberMe = false } = action.payload;
      const token = generateSessionToken(user.email);
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const tokenExpiry = Date.now() + (rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000); // 30 days or 24 hours
      
      state.loading = false;
      state.isAuthenticated = true;
      state.user = user;
      state.token = token;
      state.tokenExpiry = tokenExpiry;
      state.sessionId = sessionId;
      state.error = null;
      
      // Store auth data with incognito mode support
      storeAuthData(token, { ...user, tokenExpiry, sessionId });
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.tokenExpiry = null;
      state.sessionId = null;
      state.error = action.payload;
      clearAuthData();
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.tokenExpiry = null;
      state.sessionId = null;
      state.error = null;
      clearAuthData();
    },
    refreshToken: (state) => {
      if (state.token && state.user) {
        const newToken = generateSessionToken(state.user.email);
        const newExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        
        state.token = newToken;
        state.tokenExpiry = newExpiry;
        
        // Update stored token
        storeAuthData(newToken, { ...state.user, tokenExpiry: newExpiry, sessionId: state.sessionId });
      }
    },
    checkTokenExpiry: (state) => {
      if (state.token && state.tokenExpiry && Date.now() > state.tokenExpiry) {
        // Token expired, logout user
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.tokenExpiry = null;
        state.sessionId = null;
        state.error = 'Session expired. Please login again.';
        clearAuthData();
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    validateSession: (state) => {
      const storedToken = getStoredToken();
      const storedUser = getStoredUser();
      
      if (storedToken && storedUser) {
        // Check if stored token is still valid
        if (storedUser.tokenExpiry && Date.now() < storedUser.tokenExpiry) {
          state.isAuthenticated = true;
          state.user = storedUser;
          state.token = storedToken;
          state.tokenExpiry = storedUser.tokenExpiry;
          state.sessionId = storedUser.sessionId;
        } else {
          // Token expired, clear everything
          state.isAuthenticated = false;
          state.user = null;
          state.token = null;
          state.tokenExpiry = null;
          state.sessionId = null;
          clearAuthData();
        }
      }
    },
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  refreshToken, 
  checkTokenExpiry, 
  clearError,
  validateSession 
} = authSlice.actions;

export default authSlice.reducer;

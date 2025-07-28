// Environment configuration for API endpoints
const config = {
  development: {
    API_URL: 'http://localhost:3001/api',
    UPLOAD_URL: 'http://localhost:3001/uploads'
  },
  production: {
    API_URL: 'https://api.yenumax.com/api',
    UPLOAD_URL: 'https://yenumax.com/api/uploads'
  }
};

const environment = process.env.NODE_ENV || 'development';

export const API_CONFIG = {
  BASE_URL: config[environment].API_URL,
  UPLOAD_URL: config[environment].UPLOAD_URL,
  SOCKET_URL: 'https://api.yenumax.com/',
  BASE_PATH: '/',
  MAX_FILE_SIZE: 5242880, // 5MB
  SUPPORTED_FORMATS: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
};

// Utility function to get auth headers
export const getAuthHeaders = () => {
  const token = sessionStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Utility function for API calls with auth
export const apiCall = async (url, options = {}) => {
  const defaultOptions = {
    headers: getAuthHeaders(),
    ...options
  };

  // If it's FormData, don't set Content-Type (let browser set it)
  if (options.body instanceof FormData) {
    delete defaultOptions.headers['Content-Type'];
  }

  return fetch(url, defaultOptions);
};

export default API_CONFIG;

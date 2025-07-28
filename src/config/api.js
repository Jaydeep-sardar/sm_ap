// Environment configuration for API endpoints
const config = {
  development: {
    API_URL: 'http://localhost:3001/api',
    UPLOAD_URL: 'http://localhost:3001/uploads'
  },
  production: {
    API_URL: 'https://smap-production.up.railway.app/api',
    UPLOAD_URL: 'https://smap-production.up.railway.app/uploads'
  }
};

const environment = process.env.NODE_ENV || 'development';

export const API_CONFIG = {
  BASE_URL: config[environment].API_URL,
  UPLOAD_URL: config[environment].UPLOAD_URL,
  MAX_FILE_SIZE: 5242880, // 5MB
  SUPPORTED_FORMATS: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
};

export default API_CONFIG;

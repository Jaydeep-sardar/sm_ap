# Deployment Guide - SM AP Content Management System

## Overview
This project consists of:
- **Frontend**: React app deployed to Vercel
- **Backend**: Express.js API deployed to Railway

## Backend Deployment (Railway)

### 1. Prepare for Deployment
Ensure your backend has:
- ✅ `package.json` with proper scripts
- ✅ `server.js` as main entry point
- ✅ All dependencies listed
- ✅ CORS configured for frontend domain

### 2. Deploy to Railway

1. **Create Railway Account**
   - Visit [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `sm_ap` repository
   - Railway will auto-detect the Node.js app

3. **Configure Root Directory**
   - In project settings, set **Root Directory** to `backend`
   - Railway will automatically use `npm start` command

4. **Environment Variables**
   - Add in Railway dashboard:
     ```
     NODE_ENV=production
     PORT=3001
     ```

5. **Get Your Backend URL**
   - Railway will provide a URL like: `https://sm-ap-backend-production.railway.app`

### 3. Update Frontend Configuration

1. **Update .env for Production**
   ```env
   REACT_APP_API_URL=https://your-railway-url.railway.app/api
   REACT_APP_UPLOAD_URL=https://your-railway-url.railway.app/uploads
   ```

2. **Update CORS in Backend**
   Add your Vercel domain to CORS origins in `server.js`:
   ```javascript
   const corsOptions = {
     origin: [
       'http://localhost:3000',
       'https://your-vercel-app.vercel.app'
     ],
     credentials: true
   };
   ```

## Frontend Deployment (Vercel)

### 1. Your frontend is already configured for Vercel
- ✅ `vercel.json` is properly configured
- ✅ Build settings are correct
- ✅ Environment variables can be set in Vercel dashboard

### 2. Set Production Environment Variables in Vercel
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add:
   ```
   REACT_APP_API_URL=https://your-railway-url.railway.app/api
   REACT_APP_UPLOAD_URL=https://your-railway-url.railway.app/uploads
   REACT_APP_MAX_FILE_SIZE=5242880
   REACT_APP_SUPPORTED_FORMATS=image/jpeg,image/png,image/gif,image/webp
   ```

## Testing Your Deployment

### 1. Test Backend Endpoints
```bash
# Health check
curl https://your-railway-url.railway.app/api/health

# Test content endpoint
curl https://your-railway-url.railway.app/api/content
```

### 2. Test Frontend
1. Visit your Vercel URL
2. Test login functionality
3. Test content upload with image
4. Verify all CRUD operations work

## Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Ensure frontend domain is added to CORS origins in backend
   - Check that credentials are properly configured

2. **Image Upload Issues**
   - Verify Railway has proper file upload limits
   - Check that multer is configured correctly
   - Ensure upload directory exists

3. **Environment Variables**
   - Double-check all environment variables are set correctly
   - Restart both services after changing environment variables

### Backend Logs
- Check Railway logs in the project dashboard
- Look for startup errors or runtime issues

### Frontend Logs
- Check Vercel deployment logs
- Use browser developer tools for client-side errors

## Alternative Deployment Options

### Railway Alternatives:
1. **Render** (Free tier available)
2. **Heroku** (Paid)
3. **DigitalOcean App Platform**
4. **AWS Elastic Beanstalk**

### Vercel Alternatives:
1. **Netlify**
2. **GitHub Pages** (static only)
3. **Firebase Hosting**

## Production Checklist

- [ ] Backend deployed to Railway
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] CORS properly set up
- [ ] All API endpoints working
- [ ] Image upload functionality tested
- [ ] Database/storage properly configured
- [ ] SSL certificates active (automatic with Railway/Vercel)

## Monitoring and Maintenance

### Railway:
- Monitor resource usage in dashboard
- Set up logging for production issues
- Configure automatic deployments from GitHub

### Vercel:
- Monitor build times and deployment status
- Set up branch previews for testing
- Configure domain settings if using custom domain

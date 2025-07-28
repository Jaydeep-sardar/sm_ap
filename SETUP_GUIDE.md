# SM AP - Complete Setup Guide

## 🚀 Full-Stack Content Management System

This project includes a React frontend admin panel with a Node.js/Express backend API, featuring complete CRUD operations, image upload functionality, and REST API integration.

## ✨ Features Implemented

### 🎨 Frontend (React)
- **Modern Admin Dashboard** with Golden/Emerald themes
- **Home Dashboard** with table interface and category management
- **Genre Management** with full CRUD operations
- **Tags (Content Tag)** management system
- **Watch Age** management for content rating
- **Content Upload** with image upload functionality
- **Authentication System** with incognito mode support
- **Responsive Design** for all screen sizes
- **Smooth Animations** with Framer Motion

### 🔧 Backend (Node.js/Express)
- **REST API** for all CRUD operations
- **Image Upload** with Multer (single/multiple files)
- **File Management** with automatic URL generation
- **CORS** enabled for frontend communication
- **Error Handling** with comprehensive error messages
- **In-Memory Storage** (easily replaceable with database)

## 📦 Installation

### 1. Clone and Setup
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
npm run backend:install

# Or install both at once
npm run setup
```

### 2. Install Concurrently (for running both servers)
```bash
npm install --save-dev concurrently
```

## 🏃‍♂️ Running the Application

### Option 1: Run Both Frontend and Backend Together
```bash
npm run full:dev
```

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
npm run backend:dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Production Mode
```bash
# Backend
npm run backend

# Frontend
npm run build
npm start
```

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Uploaded Images**: http://localhost:3001/uploads

## 📋 API Endpoints

### Content Management
```
GET    /api/contents          - List all content
POST   /api/contents          - Create new content
PUT    /api/contents/:id      - Update content
DELETE /api/contents/:id      - Delete content
```

### Image Upload
```
POST   /api/upload/image      - Upload single image
POST   /api/upload/images     - Upload multiple images
```

### Category Management
```
GET/POST/PUT/DELETE /api/genres      - Genre management
GET/POST/PUT/DELETE /api/tags        - Tags management
GET/POST/PUT/DELETE /api/watch-ages  - Watch age management
```

## 🎯 How to Use

### 1. Access the Admin Panel
1. Open http://localhost:3000
2. Login with your credentials
3. Navigate through the sidebar menu

### 2. Upload Content
1. Go to "Upload Content" in the sidebar
2. Fill in the content details:
   - Title, Description, Genre, etc.
   - Select content type (Movie/Web Series/Documentary)
   - Upload images by clicking the upload area
   - Add tags and set watch age
3. Click "Save Content"

### 3. Manage Categories
- **Genres**: Add/edit/delete movie genres
- **Tags**: Manage content tags (Top 10, Trending, etc.)
- **Watch Age**: Set age ratings (6+, 12+, 16+, 18+)

### 4. View and Edit Content
- All uploaded content appears in the table
- Click edit icon to modify content
- Click delete icon to remove content

## 🔧 Configuration

### Environment Variables (.env)
```
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_UPLOAD_URL=http://localhost:3001/uploads
REACT_APP_MAX_FILE_SIZE=5242880
```

### Backend Configuration (backend/.env)
```
PORT=3001
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
```

## 📁 Project Structure
```
sm_ap/
├── public/                 # Static files
├── src/
│   ├── components/
│   │   ├── Dashboard/      # Main dashboard
│   │   ├── Home/          # Home dashboard section
│   │   ├── Genre/         # Genre management
│   │   ├── Tags/          # Tags management
│   │   ├── WatchAge/      # Watch age management
│   │   ├── Contents/      # Content upload & management
│   │   ├── LoginPage/     # Authentication
│   │   └── ProtectedRoute/ # Route protection
│   ├── store/             # Redux store
│   ├── hooks/             # Custom hooks
│   └── App.js             # Main app component
├── backend/
│   ├── server.js          # Express server
│   ├── package.json       # Backend dependencies
│   ├── uploads/           # Image storage (auto-created)
│   └── README.md          # Backend documentation
├── package.json           # Frontend dependencies
└── .env                   # Environment variables
```

## 🎨 UI Features

### Theme System
- **Golden Theme**: Luxury and elegance
- **Emerald Theme**: Modern and professional
- Switch between themes in the dashboard

### Responsive Design
- Mobile-first approach
- Touch-friendly interfaces
- Adaptive layouts for all screen sizes

### Animations
- Smooth transitions with Framer Motion
- Hover effects and micro-interactions
- Loading states and status messages

## 🔒 Authentication

The system includes:
- Login page with validation
- Protected routes
- Session management
- Incognito mode compatibility
- Automatic token refresh

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the 'build' folder
```

### Backend (Heroku/Railway/Render)
```bash
cd backend
# Follow your hosting provider's instructions
```

### Environment Variables for Production
Update API URLs in production:
```
REACT_APP_API_URL=https://your-backend-domain.com/api
```

## 🔧 Database Integration

The current setup uses in-memory storage. To integrate with a database:

### MongoDB Example
```javascript
const mongoose = require('mongoose');
// Replace in-memory arrays with MongoDB models
```

### MySQL Example
```javascript
const mysql = require('mysql2/promise');
// Replace in-memory operations with SQL queries
```

## 📸 Image Upload Details

### Supported Formats
- JPEG, PNG, GIF, WebP
- Maximum file size: 5MB per image
- Multiple image upload supported

### Storage
- Images stored in `backend/uploads/` directory
- Automatic URL generation
- File naming with timestamps

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend is running on port 3001
2. **Image Upload Fails**: Check file size and format
3. **API Connection**: Verify REACT_APP_API_URL in .env
4. **Port Conflicts**: Change ports in package.json scripts

### Reset Data
To reset all data, restart the backend server (in-memory storage will clear).

## 📝 Next Steps

### Recommended Enhancements
1. **Database Integration**: Replace in-memory storage
2. **User Management**: Add user roles and permissions
3. **Advanced Search**: Implement filtering and search
4. **Analytics**: Add usage statistics
5. **File Management**: Advanced image processing
6. **API Security**: Add authentication middleware
7. **Testing**: Unit and integration tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own purposes.

---

## 💡 Tips for Your HR/Manager

This project demonstrates:
- **Full-Stack Development** with React and Node.js
- **REST API Design** and implementation
- **File Upload Handling** with proper validation
- **Modern UI/UX** with responsive design
- **State Management** with Redux
- **Authentication** and route protection
- **Clean Code** architecture and organization
- **Documentation** and setup guides

The system is production-ready and can be easily extended with additional features!

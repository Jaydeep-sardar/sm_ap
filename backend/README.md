# SM AP Backend API

This is the backend API for the SM AP Content Management System, providing REST endpoints for managing content, genres, tags, watch ages, and image uploads.

## Features

### 🚀 Content Management
- **CRUD Operations**: Create, Read, Update, Delete content
- **Image Upload**: Single and multiple image upload support
- **File Management**: Automatic file handling and URL generation

### 📊 Category Management
- **Genres**: Movie/series genre management
- **Tags**: Content tagging system (Top 10, Trending, etc.)
- **Watch Ages**: Age rating management (6+, 12+, 16+, 18+)

### 🔧 Technical Features
- **Express.js**: Fast and lightweight web framework
- **Multer**: File upload handling
- **CORS**: Cross-origin resource sharing enabled
- **Error Handling**: Comprehensive error management
- **In-Memory Storage**: Quick setup (easily replaceable with database)

## API Endpoints

### 📸 Image Upload
```
POST /api/upload/image        - Upload single image
POST /api/upload/images       - Upload multiple images
```

### 🎬 Content Management
```
GET    /api/contents          - Get all contents
GET    /api/contents/:id      - Get content by ID
POST   /api/contents          - Create new content
PUT    /api/contents/:id      - Update content
DELETE /api/contents/:id      - Delete content
```

### 🎭 Genre Management
```
GET    /api/genres            - Get all genres
POST   /api/genres            - Create new genre
PUT    /api/genres/:id        - Update genre
DELETE /api/genres/:id        - Delete genre
```

### 🏷️ Tags Management
```
GET    /api/tags              - Get all tags
POST   /api/tags              - Create new tag
PUT    /api/tags/:id          - Update tag
DELETE /api/tags/:id          - Delete tag
```

### 👥 Watch Age Management
```
GET    /api/watch-ages        - Get all watch ages
POST   /api/watch-ages        - Create new watch age
PUT    /api/watch-ages/:id    - Update watch age
DELETE /api/watch-ages/:id    - Delete watch age
```

## Installation & Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Start Production Server
```bash
npm start
```

The server will start on `http://localhost:3001`

## Configuration

### Environment Variables
Create a `.env` file in the backend directory:
```
PORT=3001
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
```

### Frontend Configuration
Update your React app's environment variables:
```
REACT_APP_API_URL=http://localhost:3001/api
```

## File Structure
```
backend/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── uploads/               # Image upload directory (auto-created)
└── README.md              # This file
```

## Sample Data

### Content Object
```json
{
  "id": 1,
  "title": "Sample Movie",
  "description": "A great movie description",
  "genre": "Action",
  "tags": ["trending", "top-rated"],
  "watchAge": "16+",
  "type": "movie",
  "duration": "120 min",
  "releaseDate": "2024-01-01",
  "director": "John Doe",
  "cast": "Actor 1, Actor 2",
  "language": "English",
  "quality": "1080p",
  "images": ["http://localhost:3001/uploads/image1.jpg"],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Genre Object
```json
{
  "id": 1,
  "name": "Action"
}
```

### Tag Object
```json
{
  "id": 1,
  "name": "Trending"
}
```

### Watch Age Object
```json
{
  "id": 1,
  "ageRange": "16+"
}
```

## Image Upload

### Single Image Upload
```javascript
const formData = new FormData();
formData.append('image', file);

fetch('http://localhost:3001/api/upload/image', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data.url));
```

### Multiple Images Upload
```javascript
const formData = new FormData();
files.forEach(file => {
  formData.append('images', file);
});

fetch('http://localhost:3001/api/upload/images', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data.urls));
```

## Database Integration

To replace in-memory storage with a database:

### MongoDB Example
```javascript
const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: String,
  description: String,
  genre: String,
  // ... other fields
});

const Content = mongoose.model('Content', contentSchema);
```

### MySQL Example
```javascript
const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'sm_ap'
});
```

## Deployment

### Heroku
```bash
git add .
git commit -m "Backend ready for deployment"
heroku create sm-ap-backend
git push heroku main
```

### Docker
```dockerfile
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## Security Considerations

- Add authentication middleware
- Implement rate limiting
- Validate file types and sizes
- Use HTTPS in production
- Add input validation and sanitization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

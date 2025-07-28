// server.js - Sample Node.js/Express Backend for Content Management API
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-vercel-app.vercel.app'] // Replace with your actual Vercel URL
    : ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// In-memory data storage (replace with database in production)
let contents = [];
let genres = [
  { id: 1, name: 'Sci-Fi' },
  { id: 2, name: 'Adventure' },
  { id: 3, name: 'Children & Family' },
  { id: 4, name: 'Classic' },
  { id: 5, name: 'Comedies' },
  { id: 6, name: 'Documentaries' },
  { id: 7, name: 'Dramas' },
  { id: 8, name: 'Horror' },
  { id: 9, name: 'Music' },
  { id: 10, name: 'Romantic' },
  { id: 11, name: 'Fantasy' },
  { id: 12, name: 'Sports' },
  { id: 13, name: 'Thrillers' },
  { id: 14, name: 'TV Shows' },
  { id: 15, name: 'Action' },
  { id: 16, name: 'Action Sci-Fi & Fantasy' },
  { id: 17, name: 'Crime' }
];
let tags = [
  { id: 1, name: 'Top 10' },
  { id: 2, name: 'Recently Released' },
  { id: 3, name: 'Trending' }
];
let watchAges = [
  { id: 1, ageRange: '6+' },
  { id: 2, ageRange: '12+' },
  { id: 3, ageRange: '16+' },
  { id: 4, ageRange: '18+' }
];

// Helper function to generate ID
const generateId = (array) => Math.max(...array.map(item => item.id), 0) + 1;

// ======================
// IMAGE UPLOAD ROUTES
// ======================

// Upload single image
app.post('/api/upload/image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Upload multiple images
app.post('/api/upload/images', upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    
    const imageUrls = req.files.map(file => 
      `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
    );
    
    res.json({ urls: imageUrls });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload images' });
  }
});

// ======================
// CONTENT ROUTES
// ======================

// Get all contents
app.get('/api/contents', (req, res) => {
  res.json(contents);
});

// Get content by ID
app.get('/api/contents/:id', (req, res) => {
  const content = contents.find(c => c.id === parseInt(req.params.id));
  if (!content) {
    return res.status(404).json({ error: 'Content not found' });
  }
  res.json(content);
});

// Create new content
app.post('/api/contents', (req, res) => {
  try {
    const newContent = {
      id: generateId(contents),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    contents.push(newContent);
    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create content' });
  }
});

// Update content
app.put('/api/contents/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const contentIndex = contents.findIndex(c => c.id === id);
    
    if (contentIndex === -1) {
      return res.status(404).json({ error: 'Content not found' });
    }
    
    contents[contentIndex] = {
      ...contents[contentIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    res.json(contents[contentIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// Delete content
app.delete('/api/contents/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const contentIndex = contents.findIndex(c => c.id === id);
    
    if (contentIndex === -1) {
      return res.status(404).json({ error: 'Content not found' });
    }
    
    contents.splice(contentIndex, 1);
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete content' });
  }
});

// ======================
// GENRE ROUTES
// ======================

// Get all genres
app.get('/api/genres', (req, res) => {
  res.json(genres);
});

// Create new genre
app.post('/api/genres', (req, res) => {
  try {
    const newGenre = {
      id: generateId(genres),
      name: req.body.name
    };
    
    genres.push(newGenre);
    res.status(201).json(newGenre);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create genre' });
  }
});

// Update genre
app.put('/api/genres/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const genreIndex = genres.findIndex(g => g.id === id);
    
    if (genreIndex === -1) {
      return res.status(404).json({ error: 'Genre not found' });
    }
    
    genres[genreIndex] = {
      ...genres[genreIndex],
      name: req.body.name
    };
    
    res.json(genres[genreIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update genre' });
  }
});

// Delete genre
app.delete('/api/genres/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const genreIndex = genres.findIndex(g => g.id === id);
    
    if (genreIndex === -1) {
      return res.status(404).json({ error: 'Genre not found' });
    }
    
    genres.splice(genreIndex, 1);
    res.json({ message: 'Genre deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete genre' });
  }
});

// ======================
// TAGS ROUTES
// ======================

// Get all tags
app.get('/api/tags', (req, res) => {
  res.json(tags);
});

// Create new tag
app.post('/api/tags', (req, res) => {
  try {
    const newTag = {
      id: generateId(tags),
      name: req.body.name
    };
    
    tags.push(newTag);
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tag' });
  }
});

// Update tag
app.put('/api/tags/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tagIndex = tags.findIndex(t => t.id === id);
    
    if (tagIndex === -1) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    
    tags[tagIndex] = {
      ...tags[tagIndex],
      name: req.body.name
    };
    
    res.json(tags[tagIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update tag' });
  }
});

// Delete tag
app.delete('/api/tags/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tagIndex = tags.findIndex(t => t.id === id);
    
    if (tagIndex === -1) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    
    tags.splice(tagIndex, 1);
    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete tag' });
  }
});

// ======================
// WATCH AGE ROUTES
// ======================

// Get all watch ages
app.get('/api/watch-ages', (req, res) => {
  res.json(watchAges);
});

// Create new watch age
app.post('/api/watch-ages', (req, res) => {
  try {
    const newWatchAge = {
      id: generateId(watchAges),
      ageRange: req.body.ageRange
    };
    
    watchAges.push(newWatchAge);
    res.status(201).json(newWatchAge);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create watch age' });
  }
});

// Update watch age
app.put('/api/watch-ages/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const watchAgeIndex = watchAges.findIndex(w => w.id === id);
    
    if (watchAgeIndex === -1) {
      return res.status(404).json({ error: 'Watch age not found' });
    }
    
    watchAges[watchAgeIndex] = {
      ...watchAges[watchAgeIndex],
      ageRange: req.body.ageRange
    };
    
    res.json(watchAges[watchAgeIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update watch age' });
  }
});

// Delete watch age
app.delete('/api/watch-ages/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const watchAgeIndex = watchAges.findIndex(w => w.id === id);
    
    if (watchAgeIndex === -1) {
      return res.status(404).json({ error: 'Watch age not found' });
    }
    
    watchAges.splice(watchAgeIndex, 1);
    res.json({ message: 'Watch age deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete watch age' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
  }
  res.status(500).json({ error: error.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API endpoints available:`);
  console.log(`- POST /api/upload/image (single image upload)`);
  console.log(`- POST /api/upload/images (multiple image upload)`);
  console.log(`- GET/POST/PUT/DELETE /api/contents`);
  console.log(`- GET/POST/PUT/DELETE /api/genres`);
  console.log(`- GET/POST/PUT/DELETE /api/tags`);
  console.log(`- GET/POST/PUT/DELETE /api/watch-ages`);
});

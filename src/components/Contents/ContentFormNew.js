import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSave, FiUpload, FiImage, FiLoader, FiTrash2, FiEdit, FiEye } from 'react-icons/fi';

const ContentsContainer = styled.div`
  min-height: calc(100vh - 120px);
  background: ${props => props.theme === 'golden' 
    ? 'linear-gradient(135deg, #fdfbf7 0%, #f8f6f0 100%)'
    : 'linear-gradient(135deg, #f0fdfa 0%, #ecfdf5 100%)'
  };
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const ContentTitle = styled.h1`
  color: ${props => props.theme === 'golden' ? '#92400e' : '#065f46'};
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const FormContainer = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: ${props => props.theme === 'golden' 
    ? '0 4px 20px rgba(217, 119, 6, 0.1)'
    : '0 4px 20px rgba(5, 150, 105, 0.1)'
  };
  border: 1px solid ${props => props.theme === 'golden' 
    ? 'rgba(217, 119, 6, 0.2)'
    : 'rgba(5, 150, 105, 0.2)'
  };
  margin-bottom: 30px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  color: #374151;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid ${props => props.theme === 'golden' 
    ? 'rgba(217, 119, 6, 0.3)'
    : 'rgba(5, 150, 105, 0.3)'
  };
  border-radius: 8px;
  font-size: 14px;
  background: white;
  color: #374151;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme === 'golden' ? '#d97706' : '#059669'};
    box-shadow: ${props => props.theme === 'golden' 
      ? '0 0 0 3px rgba(217, 119, 6, 0.1)'
      : '0 0 0 3px rgba(5, 150, 105, 0.1)'
    };
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 2px solid ${props => props.theme === 'golden' 
    ? 'rgba(217, 119, 6, 0.3)'
    : 'rgba(5, 150, 105, 0.3)'
  };
  border-radius: 8px;
  font-size: 14px;
  background: white;
  color: #374151;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme === 'golden' ? '#d97706' : '#059669'};
    box-shadow: ${props => props.theme === 'golden' 
      ? '0 0 0 3px rgba(217, 119, 6, 0.1)'
      : '0 0 0 3px rgba(5, 150, 105, 0.1)'
    };
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 2px solid ${props => props.theme === 'golden' 
    ? 'rgba(217, 119, 6, 0.3)'
    : 'rgba(5, 150, 105, 0.3)'
  };
  border-radius: 8px;
  font-size: 14px;
  background: white;
  color: #374151;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme === 'golden' ? '#d97706' : '#059669'};
    box-shadow: ${props => props.theme === 'golden' 
      ? '0 0 0 3px rgba(217, 119, 6, 0.1)'
      : '0 0 0 3px rgba(5, 150, 105, 0.1)'
    };
  }
`;

const ImageUploadContainer = styled.div`
  border: 2px dashed ${props => props.theme === 'golden' 
    ? 'rgba(217, 119, 6, 0.3)'
    : 'rgba(5, 150, 105, 0.3)'
  };
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  background: ${props => props.theme === 'golden' 
    ? 'rgba(252, 211, 77, 0.1)'
    : 'rgba(16, 185, 129, 0.1)'
  };
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme === 'golden' ? '#d97706' : '#059669'};
    background: ${props => props.theme === 'golden' 
      ? 'rgba(252, 211, 77, 0.2)'
      : 'rgba(16, 185, 129, 0.2)'
    };
  }
`;

const ImagePreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 15px;
`;

const PreviewImage = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid ${props => props.theme === 'golden' 
    ? 'rgba(217, 119, 6, 0.3)'
    : 'rgba(5, 150, 105, 0.3)'
  };
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(220, 38, 38, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  
  &:hover {
    background: rgba(220, 38, 38, 1);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled(motion.button)`
  background: ${props => {
    if (props.variant === 'primary') {
      return props.theme === 'golden' 
        ? 'linear-gradient(135deg, #d97706 0%, #b45309 100%)'
        : 'linear-gradient(135deg, #059669 0%, #047857 100%)';
    }
    return 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
  }};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContentTable = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${props => props.theme === 'golden' 
    ? '0 4px 20px rgba(217, 119, 6, 0.1)'
    : '0 4px 20px rgba(5, 150, 105, 0.1)'
  };
  border: 1px solid ${props => props.theme === 'golden' 
    ? 'rgba(217, 119, 6, 0.2)'
    : 'rgba(5, 150, 105, 0.2)'
  };
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: ${props => props.theme === 'golden' 
    ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
  };
`;

const TableHeaderCell = styled.th`
  padding: 16px 20px;
  text-align: left;
  color: white;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableBody = styled.tbody``;

const TableRow = styled(motion.tr)`
  border-bottom: 1px solid #f3f4f6;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme === 'golden' 
      ? 'rgba(251, 191, 36, 0.05)'
      : 'rgba(16, 185, 129, 0.05)'
    };
  }
`;

const TableCell = styled.td`
  padding: 16px 20px;
  color: #374151;
  font-size: 14px;
  vertical-align: middle;
  
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 6px;
  }
`;

const ActionButton = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.3s ease;
  margin: 0 4px;
  color: ${props => {
    if (props.variant === 'edit') return props.theme === 'golden' ? '#d97706' : '#059669';
    if (props.variant === 'delete') return '#dc2626';
    return '#6b7280';
  }};
  
  &:hover {
    background: ${props => {
      if (props.variant === 'edit') {
        return props.theme === 'golden' 
          ? 'rgba(217, 119, 6, 0.1)'
          : 'rgba(5, 150, 105, 0.1)';
      }
      if (props.variant === 'delete') return 'rgba(220, 38, 38, 0.1)';
      return 'rgba(107, 114, 128, 0.1)';
    }};
  }
`;

const LoadingSpinner = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  
  svg {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const StatusMessage = styled(motion.div)`
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
  
  &.success {
    background: #d1fae5;
    color: #065f46;
    border: 1px solid #a7f3d0;
  }
  
  &.error {
    background: #fee2e2;
    color: #991b1b;
    border: 1px solid #fca5a5;
  }
`;

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const ContentForm = () => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    tags: '',
    watchAge: '',
    type: 'movie', // movie, webseries, other
    duration: '',
    releaseDate: '',
    director: '',
    cast: '',
    language: '',
    quality: '1080p'
  });
  
  // Images state
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  
  // Content list state
  const [contents, setContents] = useState([]);
  const [editingContent, setEditingContent] = useState(null);
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [fetchingContents, setFetchingContents] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });

  // Fetch contents on component mount
  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    setFetchingContents(true);
    try {
      const response = await fetch(`${API_BASE_URL}/contents`);
      if (response.ok) {
        const data = await response.json();
        setContents(data);
      } else {
        throw new Error('Failed to fetch contents');
      }
    } catch (error) {
      console.error('Error fetching contents:', error);
      setStatusMessage({ type: 'error', message: 'Failed to fetch contents' });
    } finally {
      setFetchingContents(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImages(prev => [...prev, event.target.result]);
        };
        reader.readAsDataURL(file);
        setImageFiles(prev => [...prev, file]);
      }
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    if (imageFiles.length === 0) return [];
    
    const uploadedImageUrls = [];
    
    for (const file of imageFiles) {
      const formData = new FormData();
      formData.append('image', file);
      
      try {
        const response = await fetch(`${API_BASE_URL}/upload/image`, {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          const data = await response.json();
          uploadedImageUrls.push(data.url);
        } else {
          throw new Error('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
      }
    }
    
    return uploadedImageUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Upload images first
      const imageUrls = await uploadImages();
      
      // Prepare content data
      const contentData = {
        ...formData,
        images: imageUrls,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };
      
      // Submit content
      const url = editingContent 
        ? `${API_BASE_URL}/contents/${editingContent.id}`
        : `${API_BASE_URL}/contents`;
      
      const method = editingContent ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contentData)
      });
      
      if (response.ok) {
        const savedContent = await response.json();
        setStatusMessage({ 
          type: 'success', 
          message: editingContent ? 'Content updated successfully!' : 'Content created successfully!' 
        });
        
        // Reset form
        resetForm();
        
        // Refresh contents list
        fetchContents();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save content');
      }
    } catch (error) {
      console.error('Error submitting content:', error);
      setStatusMessage({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      genre: '',
      tags: '',
      watchAge: '',
      type: 'movie',
      duration: '',
      releaseDate: '',
      director: '',
      cast: '',
      language: '',
      quality: '1080p'
    });
    setImages([]);
    setImageFiles([]);
    setEditingContent(null);
  };

  const handleEdit = (content) => {
    setFormData({
      ...content,
      tags: content.tags.join(', ')
    });
    setImages(content.images || []);
    setImageFiles([]);
    setEditingContent(content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this content?')) {
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/contents/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setStatusMessage({ type: 'success', message: 'Content deleted successfully!' });
        fetchContents();
      } else {
        throw new Error('Failed to delete content');
      }
    } catch (error) {
      console.error('Error deleting content:', error);
      setStatusMessage({ type: 'error', message: 'Failed to delete content' });
    }
  };

  return (
    <ContentsContainer theme={currentTheme}>
      <ContentHeader>
        <ContentTitle theme={currentTheme}>
          {editingContent ? 'Edit Content' : 'Upload Content'}
        </ContentTitle>
      </ContentHeader>

      {statusMessage.message && (
        <StatusMessage 
          className={statusMessage.type}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {statusMessage.message}
        </StatusMessage>
      )}

      <FormContainer
        theme={currentTheme}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <FormGroup>
              <Label>Title *</Label>
              <Input
                theme={currentTheme}
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter content title"
              />
            </FormGroup>

            <FormGroup>
              <Label>Type *</Label>
              <Select
                theme={currentTheme}
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="movie">Movie</option>
                <option value="webseries">Web Series</option>
                <option value="documentary">Documentary</option>
                <option value="other">Other</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Genre</Label>
              <Input
                theme={currentTheme}
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                placeholder="e.g., Action, Comedy, Drama"
              />
            </FormGroup>

            <FormGroup>
              <Label>Watch Age</Label>
              <Select
                theme={currentTheme}
                name="watchAge"
                value={formData.watchAge}
                onChange={handleInputChange}
              >
                <option value="">Select age rating</option>
                <option value="6+">6+</option>
                <option value="12+">12+</option>
                <option value="16+">16+</option>
                <option value="18+">18+</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Duration</Label>
              <Input
                theme={currentTheme}
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="e.g., 120 min or 8 episodes"
              />
            </FormGroup>

            <FormGroup>
              <Label>Release Date</Label>
              <Input
                theme={currentTheme}
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Director</Label>
              <Input
                theme={currentTheme}
                type="text"
                name="director"
                value={formData.director}
                onChange={handleInputChange}
                placeholder="Director name"
              />
            </FormGroup>

            <FormGroup>
              <Label>Language</Label>
              <Input
                theme={currentTheme}
                type="text"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                placeholder="e.g., English, Hindi, Spanish"
              />
            </FormGroup>

            <FormGroup>
              <Label>Quality</Label>
              <Select
                theme={currentTheme}
                name="quality"
                value={formData.quality}
                onChange={handleInputChange}
              >
                <option value="720p">720p HD</option>
                <option value="1080p">1080p Full HD</option>
                <option value="4K">4K Ultra HD</option>
                <option value="8K">8K</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Cast</Label>
              <Input
                theme={currentTheme}
                type="text"
                name="cast"
                value={formData.cast}
                onChange={handleInputChange}
                placeholder="Main actors (comma separated)"
              />
            </FormGroup>

            <FormGroup>
              <Label>Tags</Label>
              <Input
                theme={currentTheme}
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="e.g., trending, top-rated, new (comma separated)"
              />
            </FormGroup>

            <FormGroup className="full-width">
              <Label>Description</Label>
              <TextArea
                theme={currentTheme}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter content description..."
                rows={4}
              />
            </FormGroup>

            <FormGroup className="full-width">
              <Label>Images</Label>
              <ImageUploadContainer theme={currentTheme}>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                  id="image-upload"
                />
                <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
                  <FiImage size={48} color={currentTheme === 'golden' ? '#d97706' : '#059669'} />
                  <p>Click to upload images or drag and drop</p>
                  <small>Supports: JPG, PNG, GIF (Max 5MB each)</small>
                </label>
              </ImageUploadContainer>
              
              {images.length > 0 && (
                <ImagePreview>
                  {images.map((image, index) => (
                    <PreviewImage key={index} theme={currentTheme}>
                      <img src={image} alt={`Preview ${index + 1}`} />
                      <RemoveImageButton onClick={() => removeImage(index)}>
                        ×
                      </RemoveImageButton>
                    </PreviewImage>
                  ))}
                </ImagePreview>
              )}
            </FormGroup>
          </FormGrid>

          <ButtonContainer>
            <Button
              theme={currentTheme}
              variant="primary"
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <>
                  <FiLoader />
                  {editingContent ? 'Updating...' : 'Saving...'}
                </>
              ) : (
                <>
                  <FiSave />
                  {editingContent ? 'Update Content' : 'Save Content'}
                </>
              )}
            </Button>
            
            {editingContent && (
              <Button
                theme={currentTheme}
                type="button"
                onClick={resetForm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel Edit
              </Button>
            )}
          </ButtonContainer>
        </form>
      </FormContainer>

      {/* Content List */}
      <ContentTable
        theme={currentTheme}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Table>
          <TableHeader theme={currentTheme}>
            <tr>
              <TableHeaderCell>Image</TableHeaderCell>
              <TableHeaderCell>Title</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Genre</TableHeaderCell>
              <TableHeaderCell>Watch Age</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </tr>
          </TableHeader>
          <TableBody>
            {fetchingContents ? (
              <tr>
                <TableCell colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
                  <LoadingSpinner>
                    <FiLoader />
                    Loading contents...
                  </LoadingSpinner>
                </TableCell>
              </tr>
            ) : contents.length === 0 ? (
              <tr>
                <TableCell colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
                  No contents available. Create your first content above!
                </TableCell>
              </tr>
            ) : (
              contents.map((content, index) => (
                <TableRow
                  key={content.id}
                  theme={currentTheme}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <TableCell>
                    {content.images && content.images[0] ? (
                      <img src={content.images[0]} alt={content.title} />
                    ) : (
                      <div style={{ 
                        width: '60px', 
                        height: '60px', 
                        background: '#f3f4f6', 
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <FiImage color="#9ca3af" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{content.title}</TableCell>
                  <TableCell style={{ textTransform: 'capitalize' }}>{content.type}</TableCell>
                  <TableCell>{content.genre || '-'}</TableCell>
                  <TableCell>{content.watchAge || '-'}</TableCell>
                  <TableCell>
                    <ActionButton
                      theme={currentTheme}
                      variant="edit"
                      onClick={() => handleEdit(content)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiEdit />
                    </ActionButton>
                    <ActionButton
                      theme={currentTheme}
                      variant="delete"
                      onClick={() => handleDelete(content.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiTrash2 />
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ContentTable>
    </ContentsContainer>
  );
};

export default ContentForm;

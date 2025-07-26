import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSave } from 'react-icons/fi';

const ContentsContainer = styled.div`
  min-height: calc(100vh - 140px);
  background: white;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ContentTitle = styled.h2`
  color: #333333;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  width: 100%;
`;

const ActionButton = styled(motion.button)`
  background: ${props => props.theme === 'golden' 
    ? 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)' 
    : 'linear-gradient(135deg, #10B981 0%, #047857 100%)'};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const FilterSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 8px 16px;
  width: 300px;
  
  input {
    background: transparent;
    border: none;
    color: white;
    width: 100%;
    outline: none;
    margin-left: 8px;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 6px;
`;

const ViewButton = styled.button`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ContentGrid = styled.div`
  display: ${props => props.viewMode === 'grid' ? 'grid' : 'block'};
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const ContentCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    border-color: ${props => props.theme === 'golden' ? '#FFD700' : '#10B981'};
  }
`;

const CardImage = styled.div`
  height: 180px;
  background-size: cover;
  background-position: center;
  background-image: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #333 0%, #111 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    font-size: 48px;
    opacity: 0.5;
  }
`;

const CardContent = styled.div`
  padding: 16px;
`;

const CardTitle = styled.h3`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const CardMeta = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const Tag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 12px;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const ActionIconButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.color === 'danger' 
      ? 'rgba(239, 68, 68, 0.7)' 
      : props.theme === 'golden' ? 'rgba(255, 215, 0, 0.7)' : 'rgba(16, 185, 129, 0.7)'};
  }
`;

const ListRow = styled.div`
  display: grid;
  grid-template-columns: 80px 2fr 1fr 1fr auto;
  align-items: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border-radius: 12px;
  margin-bottom: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: ${props => props.theme === 'golden' ? '#FFD700' : '#10B981'};
  }
`;

const ListThumbnail = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  background-image: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #333 0%, #111 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    font-size: 24px;
    opacity: 0.5;
  }
`;

// Mock data for content items
const mockContents = [
  {
    id: 1,
    title: "User Interface Design Trends 2025",
    type: "article",
    image: "https://source.unsplash.com/random/800x600/?ui",
    author: "John Doe",
    date: "2025-07-22",
    tags: ["Design", "UI", "Trends"],
    status: "Published"
  },
  {
    id: 2,
    title: "Product Photography Best Practices",
    type: "image",
    image: "https://source.unsplash.com/random/800x600/?photography",
    author: "Sarah Miller",
    date: "2025-07-20",
    tags: ["Photography", "Products", "Marketing"],
    status: "Draft"
  },
  {
    id: 3,
    title: "Backend Development with Node.js",
    type: "article",
    image: "https://source.unsplash.com/random/800x600/?code",
    author: "Michael Chen",
    date: "2025-07-18",
    tags: ["Development", "Node.js", "Backend"],
    status: "Published"
  },
  {
    id: 4,
    title: "Advanced Animation Techniques",
    type: "video",
    image: "https://source.unsplash.com/random/800x600/?animation",
    author: "Ana Martinez",
    date: "2025-07-15",
    tags: ["Animation", "Design", "Motion"],
    status: "Published"
  },
  {
    id: 5,
    title: "Marketing Strategy for SaaS Products",
    type: "document",
    image: "https://source.unsplash.com/random/800x600/?marketing",
    author: "Robert Wilson",
    date: "2025-07-10",
    tags: ["Marketing", "SaaS", "Strategy"],
    status: "Draft"
  },
  {
    id: 6,
    title: "E-commerce Conversion Optimization",
    type: "article",
    image: "https://source.unsplash.com/random/800x600/?ecommerce",
    author: "Emily Johnson",
    date: "2025-07-05",
    tags: ["E-commerce", "Conversion", "Sales"],
    status: "Published"
  },
];

// New styled components for the Add Content form
const FormContainer = styled.div`
  background: white;
  border-radius: 0;
  padding: 30px;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  border: none;
`;

const FormTitle = styled.h2`
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || '1fr'};
  gap: 20px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  color: #333333;
  margin-bottom: 8px;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  background: white;
  border: 1px solid #cccccc;
  border-radius: 0;
  padding: 12px 16px;
  color: #333333;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #1976D2;
  }
  
  &::placeholder {
    color: #999999;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  background: white;
  border: 1px solid #cccccc;
  border-radius: 0;
  padding: 12px 16px;
  color: #333333;
  font-size: 14px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23333333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  
  &:focus {
    outline: none;
    border-color: #1976D2;
  }
  
  option {
    background: white;
    color: #333333;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  background: white;
  border: 1px solid #cccccc;
  border-radius: 0;
  padding: 12px 16px;
  color: #333333;
  font-size: 14px;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #1976D2;
  }
  
  &::placeholder {
    color: #999999;
  }
`;

const GenreSelection = styled.div`
  max-height: 150px;
  overflow-y: auto;
  background: white;
  border: 1px solid #cccccc;
  border-radius: 0;
  padding: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cccccc;
  }
`;

const GenreOption = styled.div`
  padding: 8px 12px;
  color: #333333;
  cursor: pointer;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const SubmitButton = styled(motion.button)`
  background: #1976D2;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 0;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: auto;
  margin-top: 20px;
`;

const Contents = () => {
  const { selectedTheme } = useSelector((state) => state.theme);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    year: '',
    rating: '',
    watchAge: '',
    genre: []
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
  };
  
  return (
    <ContentsContainer>
      <ContentHeader>
        <ContentTitle>ADD CONTENT</ContentTitle>
      </ContentHeader>
      
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormRow columns="1fr 1fr">
            <FormGroup>
              <FormLabel>Category</FormLabel>
              <FormSelect 
                name="category" 
                value={formData.category}
                onChange={handleInputChange}
                theme={selectedTheme}
              >
                <option value="">Select category</option>
                <option value="movies">Movies</option>
                <option value="webseries">Webseries</option>
                <option value="documentaries">Documentaries</option>
                <option value="kids">Kids</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>Title</FormLabel>
              <FormInput 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter title"
                theme={selectedTheme}
              />
            </FormGroup>
          </FormRow>
          
          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormTextarea 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              theme={selectedTheme}
            />
          </FormGroup>
          
          <FormRow columns="1fr 1fr">
            <FormGroup>
              <FormLabel>Year (Created At)</FormLabel>
              <FormInput 
                type="text" 
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                placeholder="YYYY"
                theme={selectedTheme}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Average Rating</FormLabel>
              <FormInput 
                type="text" 
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                placeholder="0-10"
                theme={selectedTheme}
              />
            </FormGroup>
          </FormRow>
          
          <FormRow columns="1fr 1fr">
            <FormGroup>
              <FormLabel>Watch Age</FormLabel>
              <FormSelect 
                name="watchAge" 
                value={formData.watchAge}
                onChange={handleInputChange}
                theme={selectedTheme}
              >
                <option value="">Select age</option>
                <option value="all">All Ages</option>
                <option value="7+">7+</option>
                <option value="13+">13+</option>
                <option value="16+">16+</option>
                <option value="18+">18+</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>Genre</FormLabel>
              <GenreSelection>
                <GenreOption>Sci-Fi</GenreOption>
                <GenreOption>Adventure</GenreOption>
                <GenreOption>Children & Family</GenreOption>
                <GenreOption>Classic</GenreOption>
                <GenreOption>Comedy</GenreOption>
                <GenreOption>Documentary</GenreOption>
                <GenreOption>Drama</GenreOption>
                <GenreOption>Horror</GenreOption>
                <GenreOption>Thriller</GenreOption>
                <GenreOption>Action</GenreOption>
              </GenreSelection>
            </FormGroup>
          </FormRow>
          
          <SubmitButton
            type="submit"
            theme={selectedTheme}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiSave />
            Save Content
          </SubmitButton>
        </form>
      </FormContainer>
    </ContentsContainer>
  );
};

export default Contents;

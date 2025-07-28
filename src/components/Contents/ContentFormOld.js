import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSave, FiUpload, FiImage, FiLoader } from 'react-icons/fi';

const ContentsContainer = styled.div`
  min-height: calc(100vh - 120px);
  background: white;
  padding: 10px;
  
  @media (min-width: 768px) {
    min-height: calc(100vh - 140px);
    padding: 15px;
  }
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 5px;
  
  @media (min-width: 768px) {
    margin-bottom: 24px;
    padding: 0;
  }
`;

const ContentTitle = styled.h2`
  color: #333333;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  width: 100%;
  letter-spacing: 0.3px;
  
  @media (min-width: 576px) {
    font-size: 20px;
  }
  
  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

// Form styled components
const FormContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 15px;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  border: none;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  
  @media (min-width: 576px) {
    padding: 20px;
  }
  
  @media (min-width: 768px) {
    padding: 25px;
    border-radius: 10px;
  }
  
  @media (min-width: 992px) {
    padding: 30px;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  margin-bottom: 15px;
  
  @media (min-width: 768px) {
    grid-template-columns: ${props => props.columns || '1fr'};
    gap: 20px;
    margin-bottom: 20px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
  transition: all 0.2s ease;
  
  &:hover label {
    color: #1976D2;
  }
  
  @media (min-width: 768px) {
    margin-bottom: 20px;
  }
`;

const FormLabel = styled.label`
  display: block;
  color: #333333;
  margin-bottom: 6px;
  font-weight: 500;
  font-size: 13px;
  
  @media (min-width: 768px) {
    margin-bottom: 8px;
    font-size: 14px;
  }
`;

const FormInput = styled.input`
  width: 100%;
  background: white;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 10px 14px;
  color: #333333;
  font-size: 14px;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
  
  &:focus {
    outline: none;
    border-color: #1976D2;
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
  }
  
  &::placeholder {
    color: #999999;
  }
  
  @media (min-width: 768px) {
    padding: 12px 16px;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  background: white;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 10px 14px;
  color: #333333;
  font-size: 14px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23333333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 16px;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
  
  &:focus {
    outline: none;
    border-color: #1976D2;
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
  }
  
  option {
    background: white;
    color: #333333;
  }
  
  @media (min-width: 768px) {
    padding: 12px 16px;
    background-position: right 16px center;
    background-size: 18px;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  background: white;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 10px 14px;
  color: #333333;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
  
  &:focus {
    outline: none;
    border-color: #1976D2;
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
  }
  
  &::placeholder {
    color: #999999;
  }
  
  @media (min-width: 768px) {
    padding: 12px 16px;
    min-height: 120px;
  }
`;

const GenreSelection = styled.div`
  max-height: 120px;
  overflow-y: auto;
  background: white;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 6px;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);

  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cccccc;
    border-radius: 4px;
  }
  
  @media (min-width: 768px) {
    max-height: 150px;
    padding: 8px;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
  }
`;

const GenreOption = styled.div`
  padding: 6px 10px;
  color: #333333;
  cursor: pointer;
  border-radius: 3px;
  font-size: 13px;
  margin-bottom: 2px;
  transition: background-color 0.15s ease;
  
  &:hover {
    background: #f0f7ff;
  }
  
  &:active {
    background: #e3f2fd;
  }
  
  @media (min-width: 768px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;

const SubmitButton = styled(motion.button)`
  background: #1976D2;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-top: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background: #1565C0;
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    transform: translateY(-1px);
  }
  
  @media (min-width: 576px) {
    width: auto;
    padding: 12px 24px;
  }
  
  @media (min-width: 768px) {
    padding: 14px 28px;
    font-size: 15px;
    margin-top: 20px;
    gap: 10px;
  }
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

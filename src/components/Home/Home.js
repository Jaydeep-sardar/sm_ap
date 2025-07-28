import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit3, FiTrash2, FiPlus } from 'react-icons/fi';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: 0;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
`;

const HomeTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
  color: ${props => props.theme === 'golden' ? '#B8860B' : '#064e3b'};
  background: ${props => props.theme === 'golden' 
    ? 'linear-gradient(135deg, #DAA520 0%, #FFD700 30%, #FFA500 70%, #FF8C00 100%)' 
    : 'linear-gradient(135deg, #065f46 0%, #10B981 30%, #34D399 70%, #6EE7B7 100%)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const TableContainer = styled.div`
  background: ${props => props.theme === 'golden' 
    ? `
      linear-gradient(135deg, 
        rgba(255, 253, 245, 0.98) 0%, 
        rgba(254, 252, 232, 0.95) 20%, 
        rgba(255, 255, 255, 0.92) 50%, 
        rgba(254, 250, 224, 0.95) 80%, 
        rgba(255, 253, 245, 0.98) 100%
      )
    `
    : `
      linear-gradient(135deg, 
        rgba(240, 253, 249, 0.98) 0%, 
        rgba(236, 253, 245, 0.95) 20%, 
        rgba(255, 255, 255, 0.92) 50%, 
        rgba(209, 250, 229, 0.95) 80%, 
        rgba(240, 253, 249, 0.98) 100%
      )
    `};
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 40px;
  box-shadow: ${props => props.theme === 'golden' 
    ? `
      0 10px 40px rgba(255, 165, 0, 0.15), 
      0 0 60px rgba(255, 215, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.4)
    ` 
    : `
      0 10px 40px rgba(16, 185, 129, 0.15), 
      0 0 60px rgba(5, 150, 105, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.4)
    `};
  border: ${props => props.theme === 'golden' 
    ? '2px solid rgba(255, 215, 0, 0.25)' 
    : '2px solid rgba(16, 185, 129, 0.25)'};
  backdrop-filter: blur(30px);
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const TableHeader = styled.th`
  background: ${props => props.theme === 'golden' 
    ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 165, 0, 0.15) 100%)' 
    : 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.15) 100%)'};
  color: ${props => props.theme === 'golden' ? '#8B7355' : '#065f46'};
  padding: 15px 20px;
  text-align: left;
  font-weight: 600;
  border-bottom: ${props => props.theme === 'golden' 
    ? '2px solid rgba(255, 215, 0, 0.3)' 
    : '2px solid rgba(16, 185, 129, 0.3)'};
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:first-child {
    border-radius: 12px 0 0 0;
  }
  
  &:last-child {
    border-radius: 0 12px 0 0;
  }
  
  @media (max-width: 768px) {
    padding: 12px 15px;
    font-size: 12px;
  }
`;

const TableRow = styled.tr`
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme === 'golden' 
      ? 'rgba(255, 215, 0, 0.05)' 
      : 'rgba(16, 185, 129, 0.05)'};
  }
  
  &:nth-child(even) {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const TableCell = styled.td`
  padding: 18px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  color: ${props => props.theme === 'golden' ? '#8B7355' : '#065f46'};
  font-weight: 500;
  
  @media (max-width: 768px) {
    padding: 15px 15px;
  }
`;

const EditInput = styled.input`
  background: rgba(255, 255, 255, 0.8);
  border: ${props => props.theme === 'golden' 
    ? '2px solid rgba(255, 215, 0, 0.3)' 
    : '2px solid rgba(16, 185, 129, 0.3)'};
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  color: ${props => props.theme === 'golden' ? '#8B7355' : '#065f46'};
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme === 'golden' ? '#FFD700' : '#10B981'};
    box-shadow: ${props => props.theme === 'golden' 
      ? '0 0 10px rgba(255, 215, 0, 0.3)' 
      : '0 0 10px rgba(16, 185, 129, 0.3)'};
  }
`;

const ActionButton = styled(motion.button)`
  background: ${props => props.variant === 'delete' 
    ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
    : props.theme === 'golden' 
      ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' 
      : 'linear-gradient(135deg, #10B981 0%, #059669 100%)'};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  min-height: 40px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const AddMoreSection = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const AddMoreTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 25px;
  color: ${props => props.theme === 'golden' ? '#B8860B' : '#064e3b'};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
  }
`;

const CategoryButton = styled(motion.button)`
  background: #4285F4;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(66, 133, 244, 0.3);
  
  &:hover {
    background: #3367D6;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(66, 133, 244, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 14px;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const PageButton = styled(motion.button)`
  background: ${props => props.active 
    ? props.theme === 'golden' 
      ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' 
      : 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
    : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.active ? 'white' : props.theme === 'golden' ? '#8B7355' : '#065f46'};
  border: ${props => props.theme === 'golden' 
    ? '2px solid rgba(255, 215, 0, 0.3)' 
    : '2px solid rgba(16, 185, 129, 0.3)'};
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  min-width: 40px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const Home = ({ theme }) => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Trending', position: 1 },
    { id: 2, name: 'Recently Released', position: 2 },
    { id: 3, name: 'Crime', position: 3 },
    { id: 4, name: 'Top 10', position: 4 },
    { id: 5, name: 'Sports', position: 5 },
  ]);
  
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleEdit = (id, currentPosition) => {
    setEditingId(id);
    setEditValue(currentPosition.toString());
  };

  const handleSave = (id) => {
    setCategories(prev => 
      prev.map(cat => 
        cat.id === id 
          ? { ...cat, position: parseInt(editValue) || cat.position }
          : cat
      )
    );
    setEditingId(null);
    setEditValue('');
  };

  const handleDelete = (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const quickAddButtons = [
    'Top 10', 'Recently Released', 'Trending',
    'Sci-Fi', 'Adventure', 'Children & Family', 'Classic', 'Comedies', 'Documentaries', 'Dramas',
    'Horror', 'Music', 'Romantic', 'Fantasy', 'Sports', 'Thrillers', 'TV Shows', 'Action',
    'Action Sci-Fi & Fantasy', 'Crime'
  ];

  return (
    <HomeContainer>
      <HomeTitle theme={theme}>Home</HomeTitle>
      
      <TableContainer theme={theme}>
        <Table>
          <thead>
            <tr>
              <TableHeader theme={theme}>ID</TableHeader>
              <TableHeader theme={theme}>NAME</TableHeader>
              <TableHeader theme={theme}>POSITION</TableHeader>
              <TableHeader theme={theme}>EDIT POSITION</TableHeader>
              <TableHeader theme={theme}>DELETE</TableHeader>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <TableRow key={category.id} theme={theme}>
                <TableCell theme={theme}>{category.id}</TableCell>
                <TableCell theme={theme}>{category.name}</TableCell>
                <TableCell theme={theme}>{category.position}</TableCell>
                <TableCell theme={theme}>
                  {editingId === category.id ? (
                    <EditInput
                      theme={theme}
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleSave(category.id)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSave(category.id)}
                      autoFocus
                    />
                  ) : (
                    <ActionButton
                      theme={theme}
                      onClick={() => handleEdit(category.id, category.position)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiEdit3 />
                    </ActionButton>
                  )}
                </TableCell>
                <TableCell theme={theme}>
                  <ActionButton
                    theme={theme}
                    variant="delete"
                    onClick={() => handleDelete(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiTrash2 />
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      <AddMoreSection>
        <AddMoreTitle theme={theme}>ADD MORE</AddMoreTitle>
        <ButtonGrid>
          {quickAddButtons.map((buttonText, index) => (
            <CategoryButton
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const newCategory = {
                  id: Math.max(...categories.map(c => c.id)) + 1,
                  name: buttonText,
                  position: categories.length + 1
                };
                setCategories(prev => [...prev, newCategory]);
              }}
            >
              {buttonText}
            </CategoryButton>
          ))}
        </ButtonGrid>

        <Pagination>
          <PageButton
            theme={theme}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ‹
          </PageButton>
          
          {[1, 2, 3].map(page => (
            <PageButton
              key={page}
              theme={theme}
              active={currentPage === page}
              onClick={() => setCurrentPage(page)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {page}
            </PageButton>
          ))}
          
          <PageButton
            theme={theme}
            onClick={() => setCurrentPage(prev => Math.min(3, prev + 1))}
            disabled={currentPage === 3}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ›
          </PageButton>
        </Pagination>
      </AddMoreSection>
    </HomeContainer>
  );
};

export default Home;

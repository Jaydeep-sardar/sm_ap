import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const WatchAgeContainer = styled(motion.div)`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: ${props => props.theme === 'golden' 
    ? 'linear-gradient(135deg, #fdfbf7 0%, #f8f6f0 100%)'
    : 'linear-gradient(135deg, #f0fdfa 0%, #ecfdf5 100%)'
  };
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Header = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const Title = styled.h1`
  color: ${props => props.theme === 'golden' ? '#92400e' : '#065f46'};
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const AddWatchAgeSection = styled(motion.div)`
  background: ${props => props.theme === 'golden' 
    ? 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)'
    : 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)'
  };
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: ${props => props.theme === 'golden' 
    ? '0 4px 20px rgba(217, 119, 6, 0.1)'
    : '0 4px 20px rgba(5, 150, 105, 0.1)'
  };
  border: 1px solid ${props => props.theme === 'golden' 
    ? 'rgba(217, 119, 6, 0.2)'
    : 'rgba(5, 150, 105, 0.2)'
  };
`;

const AddWatchAgeTitle = styled.h2`
  color: ${props => props.theme === 'golden' ? '#92400e' : '#065f46'};
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const InputSection = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const WatchAgeInput = styled.input`
  flex: 1;
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
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const AddButton = styled(motion.button)`
  background: ${props => props.theme === 'golden' 
    ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
    : 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
  };
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(31, 41, 55, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const TableContainer = styled(motion.div)`
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
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
`;

const TableHeaderRow = styled.tr``;

const TableHeaderCell = styled.th`
  padding: 16px 20px;
  text-align: left;
  color: #374151;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:first-child {
    width: 80px;
  }
  
  &:nth-child(3), &:nth-child(4) {
    width: 120px;
    text-align: center;
  }
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
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 16px 20px;
  color: #374151;
  font-size: 14px;
  vertical-align: middle;
`;

const EditableCell = styled.td`
  padding: 16px 20px;
  color: #374151;
  font-size: 14px;
  vertical-align: middle;
  cursor: pointer;
  position: relative;
  
  &:hover {
    background: ${props => props.theme === 'golden' 
      ? 'rgba(251, 191, 36, 0.1)'
      : 'rgba(16, 185, 129, 0.1)'
    };
  }
`;

const EditInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 2px solid ${props => props.theme === 'golden' ? '#d97706' : '#059669'};
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  
  &:focus {
    outline: none;
    box-shadow: ${props => props.theme === 'golden' 
      ? '0 0 0 3px rgba(217, 119, 6, 0.1)'
      : '0 0 0 3px rgba(5, 150, 105, 0.1)'
    };
  }
`;

const ActionCell = styled.td`
  padding: 16px 20px;
  text-align: center;
  vertical-align: middle;
`;

const ActionButton = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.3s ease;
  margin: 0 4px;
  
  &.edit {
    color: ${props => props.theme === 'golden' ? '#d97706' : '#059669'};
    
    &:hover {
      background: ${props => props.theme === 'golden' 
        ? 'rgba(217, 119, 6, 0.1)'
        : 'rgba(5, 150, 105, 0.1)'
      };
    }
  }
  
  &.delete {
    color: #dc2626;
    
    &:hover {
      background: rgba(220, 38, 38, 0.1);
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #6b7280;
`;

const WatchAge = () => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const [watchAges, setWatchAges] = useState([
    { id: 1, ageRange: '6+' },
    { id: 2, ageRange: '12+' },
    { id: 3, ageRange: '16+' },
    { id: 4, ageRange: '18+' }
  ]);
  
  const [newWatchAge, setNewWatchAge] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAddWatchAge = () => {
    if (newWatchAge.trim()) {
      const newId = Math.max(...watchAges.map(w => w.id), 0) + 1;
      setWatchAges([...watchAges, { id: newId, ageRange: newWatchAge.trim() }]);
      setNewWatchAge('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddWatchAge();
    }
  };

  const handleEditStart = (id, currentAgeRange) => {
    setEditingId(id);
    setEditValue(currentAgeRange);
  };

  const handleEditSave = (id) => {
    if (editValue.trim()) {
      setWatchAges(watchAges.map(watchAge => 
        watchAge.id === id ? { ...watchAge, ageRange: editValue.trim() } : watchAge
      ));
    }
    setEditingId(null);
    setEditValue('');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleEditKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      handleEditSave(id);
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this watch age?')) {
      setWatchAges(watchAges.filter(watchAge => watchAge.id !== id));
    }
  };

  return (
    <WatchAgeContainer
      theme={currentTheme}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Header>
        <Title theme={currentTheme}>Watch Age</Title>
      </Header>

      <AddWatchAgeSection
        theme={currentTheme}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <AddWatchAgeTitle theme={currentTheme}>Add Watch Age</AddWatchAgeTitle>
        <InputSection>
          <WatchAgeInput
            theme={currentTheme}
            type="text"
            placeholder="enter here..."
            value={newWatchAge}
            onChange={(e) => setNewWatchAge(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <AddButton
            theme={currentTheme}
            onClick={handleAddWatchAge}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add
          </AddButton>
        </InputSection>
      </AddWatchAgeSection>

      <TableContainer
        theme={currentTheme}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Table>
          <TableHeader theme={currentTheme}>
            <TableHeaderRow>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>AGE RANGE</TableHeaderCell>
              <TableHeaderCell>EDIT</TableHeaderCell>
              <TableHeaderCell>DELETE</TableHeaderCell>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {watchAges.length === 0 ? (
              <tr>
                <td colSpan="4">
                  <EmptyState>
                    <p>No watch ages available. Add your first watch age above!</p>
                  </EmptyState>
                </td>
              </tr>
            ) : (
              watchAges.map((watchAge, index) => (
                <TableRow
                  key={watchAge.id}
                  theme={currentTheme}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <TableCell>{watchAge.id}</TableCell>
                  <EditableCell
                    theme={currentTheme}
                    onClick={() => editingId !== watchAge.id && handleEditStart(watchAge.id, watchAge.ageRange)}
                  >
                    {editingId === watchAge.id ? (
                      <EditInput
                        theme={currentTheme}
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyPress={(e) => handleEditKeyPress(e, watchAge.id)}
                        onBlur={() => handleEditSave(watchAge.id)}
                        autoFocus
                      />
                    ) : (
                      watchAge.ageRange
                    )}
                  </EditableCell>
                  <ActionCell>
                    <ActionButton
                      theme={currentTheme}
                      className="edit"
                      onClick={() => handleEditStart(watchAge.id, watchAge.ageRange)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ✏️
                    </ActionButton>
                  </ActionCell>
                  <ActionCell>
                    <ActionButton
                      theme={currentTheme}
                      className="delete"
                      onClick={() => handleDelete(watchAge.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      🗑️
                    </ActionButton>
                  </ActionCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </WatchAgeContainer>
  );
};

export default WatchAge;

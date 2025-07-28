import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const GenreContainer = styled(motion.div)`
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

const AddGenreSection = styled(motion.div)`
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

const AddGenreTitle = styled.h2`
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

const GenreInput = styled.input`
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
    ? 'linear-gradient(135deg, #d97706 0%, #b45309 100%)'
    : 'linear-gradient(135deg, #059669 0%, #047857 100%)'
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
    box-shadow: ${props => props.theme === 'golden' 
      ? '0 8px 25px rgba(217, 119, 6, 0.3)'
      : '0 8px 25px rgba(5, 150, 105, 0.3)'
    };
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
  background: ${props => props.theme === 'golden' 
    ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
  };
`;

const TableHeaderRow = styled.tr``;

const TableHeaderCell = styled.th`
  padding: 16px 20px;
  text-align: left;
  color: white;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:first-child {
    width: 80px;
  }
  
  &:last-child {
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

const Genre = () => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const [genres, setGenres] = useState([
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
  ]);
  
  const [newGenre, setNewGenre] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAddGenre = () => {
    if (newGenre.trim()) {
      const newId = Math.max(...genres.map(g => g.id), 0) + 1;
      setGenres([...genres, { id: newId, name: newGenre.trim() }]);
      setNewGenre('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddGenre();
    }
  };

  const handleEditStart = (id, currentName) => {
    setEditingId(id);
    setEditValue(currentName);
  };

  const handleEditSave = (id) => {
    if (editValue.trim()) {
      setGenres(genres.map(genre => 
        genre.id === id ? { ...genre, name: editValue.trim() } : genre
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
    if (window.confirm('Are you sure you want to delete this genre?')) {
      setGenres(genres.filter(genre => genre.id !== id));
    }
  };

  return (
    <GenreContainer
      theme={currentTheme}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Header>
        <Title theme={currentTheme}>Genre Management</Title>
      </Header>

      <AddGenreSection
        theme={currentTheme}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <AddGenreTitle theme={currentTheme}>Add Genre</AddGenreTitle>
        <InputSection>
          <GenreInput
            theme={currentTheme}
            type="text"
            placeholder="enter here..."
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <AddButton
            theme={currentTheme}
            onClick={handleAddGenre}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add
          </AddButton>
        </InputSection>
      </AddGenreSection>

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
              <TableHeaderCell>NAME</TableHeaderCell>
              <TableHeaderCell>EDIT</TableHeaderCell>
              <TableHeaderCell>DELETE</TableHeaderCell>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {genres.length === 0 ? (
              <tr>
                <td colSpan="4">
                  <EmptyState>
                    <p>No genres available. Add your first genre above!</p>
                  </EmptyState>
                </td>
              </tr>
            ) : (
              genres.map((genre, index) => (
                <TableRow
                  key={genre.id}
                  theme={currentTheme}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <TableCell>{genre.id}</TableCell>
                  <EditableCell
                    theme={currentTheme}
                    onClick={() => editingId !== genre.id && handleEditStart(genre.id, genre.name)}
                  >
                    {editingId === genre.id ? (
                      <EditInput
                        theme={currentTheme}
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyPress={(e) => handleEditKeyPress(e, genre.id)}
                        onBlur={() => handleEditSave(genre.id)}
                        autoFocus
                      />
                    ) : (
                      genre.name
                    )}
                  </EditableCell>
                  <ActionCell>
                    <ActionButton
                      theme={currentTheme}
                      className="edit"
                      onClick={() => handleEditStart(genre.id, genre.name)}
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
                      onClick={() => handleDelete(genre.id)}
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
    </GenreContainer>
  );
};

export default Genre;

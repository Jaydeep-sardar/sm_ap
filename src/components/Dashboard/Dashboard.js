import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import styled from 'styled-components';
import { motion } from 'framer-motion';
// Import Feather icons
// eslint-disable-next-line
import { FiLogOut, FiUser, FiSettings, FiHome, FiFileText, FiImage, FiBox, FiUsers, FiBarChart2 } from 'react-icons/fi';
import { HiOutlineTag } from 'react-icons/hi';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #e6e6e6;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Sidebar = styled.div`
  width: 100%;
  background: rgba(25, 118, 210, 0.95);
  padding: 0;
  height: auto;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  @media (min-width: 768px) {
    width: 260px;
    margin-right: 24px;
    height: 100vh;
    position: sticky;
    top: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    
    /* Customize scrollbar */
    &::-webkit-scrollbar {
      width: 5px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 3px;
    }
  }
`;

const Logo = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 800;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: ${props => props.theme === 'golden' ? '#1565C0' : '#1565C0'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 101;
  
  @media (min-width: 768px) {
    font-size: 24px;
    padding: 20px 24px;
    justify-content: flex-start;
  }
`;

const MenuToggle = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  transition: all 0.2s ease;
  border-radius: 4px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const NavMenu = styled.div`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  max-height: ${props => props.isOpen ? '80vh' : '0'};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  transition: max-height 0.3s ease;
  
  /* Mobile scrollbar */
  &::-webkit-scrollbar {
    width: 3px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
  
  @media (min-width: 768px) {
    display: flex;
    max-height: calc(100vh - 80px);
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 24px;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 15px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0;
    background: #64B5F6;
    transition: width 0.2s ease;
  }
  font-size: 14px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &.active {
    background: rgba(25, 118, 210, 0.3);
    color: white;
    font-weight: 600;
    
    &::before {
      width: 4px;
      background: #64B5F6;
    }
  }
  
  @media (min-width: 768px) {
    font-size: 16px;
    
    &:hover {
      padding-left: 28px;
    }
    
    &.active {
      padding-left: 28px;
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
  border-radius: 0;
  padding: 10px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  min-height: 100%;
  position: relative;
  
  /* Customize scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #e6e6e6;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #bdbdbd;
    border-radius: 3px;
  }
  
  @media (min-width: 768px) {
    padding: 20px;
    min-height: 100vh;
  }
`;

const Header = styled.div`
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(10px);
  
  @media (min-width: 768px) {
    padding: 20px 32px;
    margin-bottom: 24px;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 12px;
  }
`;

const WelcomeText = styled.div`
  color: #333;
  text-align: center;
  margin-bottom: 15px;
  
  h1 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 6px;
    background: linear-gradient(90deg, #1976D2, #64B5F6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
  }
  
  p {
    color: #666;
    font-size: 13px;
  }
  
  @media (min-width: 768px) {
    text-align: left;
    margin-bottom: 0;
    
    h1 {
      font-size: 24px;
    }
    
    p {
      font-size: 14px;
    }
  }
`;

const LogoutButton = styled(motion.button)`
  background: linear-gradient(135deg, #FF6B9D 0%, #C44569 100%);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
  font-size: 13px;
  box-shadow: 0 4px 12px rgba(196, 69, 105, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(255, 107, 157, 0.3);
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 4px 12px rgba(196, 69, 105, 0.2);
  }
  
  @media (min-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
    gap: 8px;
  }
  
  @media (min-width: 992px) {
    padding: 12px 24px;
    font-size: 15px;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 24px;
  overflow-x: hidden;
  position: relative;
  width: 100%;
  
  @media (min-width: 576px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
  }
  
  @media (min-width: 992px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08);
  }
  
  h3 {
    color: #333;
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    
    svg {
      color: #1976D2;
    }
  }
  
  p {
    color: #666;
    line-height: 1.6;
    font-size: 14px;
  }
  
  @media (min-width: 768px) {
    padding: 25px;
    
    h3 {
      font-size: 18px;
      margin-bottom: 16px;
      gap: 12px;
    }
    
    p {
      font-size: 15px;
    }
  }
  
  @media (min-width: 992px) {
    padding: 32px;
  }
`;

const Dashboard = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { selectedTheme } = useSelector((state) => state.theme);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const renderDashboardContent = () => {
    if (children) {
      return children;
    }
    
    return (
      <>
        <Header>
          <WelcomeText>
            <h1>Welcome back, {user?.name || 'Admin'}!</h1>
            <p>Current theme: {selectedTheme === 'golden' ? 'Golden (Luxury & Elegance)' : 'Emerald (Modern & Professional)'}</p>
          </WelcomeText>
          <LogoutButton
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiLogOut />
            Logout
          </LogoutButton>
        </Header>

        <ContentGrid>
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3>
              <FiHome />
              Dashboard Overview
            </h3>
            <p>
              Welcome to your admin dashboard! This is a demo implementation of the login screen you requested. 
              The authentication system is now working with Redux state management.
            </p>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>
              <FiUser />
              User Profile
            </h3>
            <p>
              Your profile information and account settings. The selected theme from the login page 
              is preserved and can be used throughout the application.
            </p>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3>
              <FiSettings />
              Settings
            </h3>
            <p>
              Configure your application preferences, theme settings, and other administrative options.
              The current theme selection is: {selectedTheme === 'golden' ? 'Golden' : 'Emerald'}.
            </p>
          </Card>
        </ContentGrid>
      </>
    );
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <Logo theme={selectedTheme}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiBox /> AdminPanel
          </div>
          <MenuToggle onClick={toggleMenu}>
            {menuOpen ? '✕' : '☰'}
          </MenuToggle>
        </Logo>
        
        <NavMenu isOpen={menuOpen}>
          <NavItem 
            to="/dashboard" 
            theme={selectedTheme}
            className={location.pathname === '/dashboard' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            <FiHome /> Home
          </NavItem>
          <NavItem 
            to="/users" 
            theme={selectedTheme}
            className={location.pathname === '/users' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            <FiUsers /> Users
          </NavItem>
          <NavItem 
            to="/genre" 
            theme={selectedTheme}
            className={location.pathname === '/genre' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            <HiOutlineTag /> Genre
          </NavItem>
          <NavItem 
            to="/tags" 
            theme={selectedTheme}
            className={location.pathname === '/tags' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            <HiOutlineTag /> Tags
          </NavItem>
          <NavItem 
            to="/watch-age" 
            theme={selectedTheme}
            className={location.pathname === '/watch-age' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            <FiUsers /> Watch-age
          </NavItem>
          <NavItem 
            to="/slider" 
            theme={selectedTheme}
            className={location.pathname === '/slider' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            <FiImage /> Slider
          </NavItem>
          <NavItem 
            to="/webseries" 
            theme={selectedTheme}
            className={location.pathname === '/webseries' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            <FiFileText /> Webseries
          </NavItem>
          <NavItem 
            to="/movies" 
            theme={selectedTheme}
            className={location.pathname === '/movies' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            <FiFileText /> Movies
          </NavItem>
          <NavItem 
            to="/contents" 
            theme={selectedTheme}
            className={location.pathname === '/contents' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            <FiFileText /> Upload Content
          </NavItem>
          <NavItem 
            to="/trending" 
            theme={selectedTheme}
            className={location.pathname === '/trending' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            <FiBarChart2 /> Trending
          </NavItem>
          <NavItem
            to="/" 
            theme={selectedTheme}
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
          >
            <FiLogOut /> Logout
          </NavItem>
        </NavMenu>
      </Sidebar>
      
      <MainContent>
        {renderDashboardContent()}
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;

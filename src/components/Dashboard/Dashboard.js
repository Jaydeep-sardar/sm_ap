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
  background: ${props => props.theme === 'golden' 
    ? 'linear-gradient(135deg, #FFD700, #FFA500, #FF8C00)' 
    : 'linear-gradient(135deg, #10B981, #059669, #047857)'};
  padding: 0;
  height: auto;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  
  @media (min-width: 768px) {
    width: 260px;
    height: 100vh;
    position: fixed;
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
  background: ${props => props.theme === 'golden' 
    ? 'rgba(255, 140, 0, 0.2)' 
    : 'rgba(4, 120, 87, 0.2)'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 101;
  backdrop-filter: blur(10px);
  
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
  max-height: ${props => props.isOpen ? 'calc(100vh - 60px)' : '0'};
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
    overflow-y: auto;
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
    background: ${props => props.theme === 'golden' ? '#FFD700' : '#10B981'};
    transition: width 0.2s ease;
  }
  font-size: 14px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &.active {
    background: ${props => props.theme === 'golden' 
      ? 'rgba(255, 215, 0, 0.2)' 
      : 'rgba(16, 185, 129, 0.2)'};
    color: white;
    font-weight: 600;
    
    &::before {
      width: 4px;
      background: ${props => props.theme === 'golden' ? '#FFD700' : '#10B981'};
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
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 0;
  padding: 12px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  min-height: 100vh;
  position: relative;
  margin-top: 60px; /* Account for fixed navbar on mobile */
  
  /* Customize scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(226, 232, 240, 0.5);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #cbd5e1, #94a3b8);
    border-radius: 4px;
    
    &:hover {
      background: linear-gradient(135deg, #94a3b8, #64748b);
    }
  }
  
  @media (min-width: 768px) {
    padding: 24px;
    margin-left: 260px; /* Account for fixed sidebar */
    margin-top: 0;
    min-height: 100vh;
  }
`;

const Header = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.02);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 10px;
  z-index: 10;
  backdrop-filter: blur(20px);
  
  @media (min-width: 768px) {
    padding: 24px 32px;
    margin-bottom: 32px;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  }
`;

const WelcomeText = styled.div`
  color: #333;
  text-align: center;
  margin-bottom: 15px;
  
  h1 {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 8px;
    background: linear-gradient(135deg, #1976D2, #64B5F6, #42A5F5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #1976D2, transparent);
      border-radius: 2px;
    }
  }
  
  p {
    color: #666;
    font-size: 14px;
    font-weight: 500;
    opacity: 0.8;
  }
  
  @media (min-width: 768px) {
    text-align: left;
    margin-bottom: 0;
    
    h1 {
      font-size: 26px;
      margin-bottom: 6px;
    }
    
    p {
      font-size: 15px;
    }
  }
`;

const LogoutButton = styled(motion.button)`
  background: linear-gradient(135deg, #FF6B9D 0%, #C44569 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-size: 14px;
  box-shadow: 0 4px 16px rgba(196, 69, 105, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 107, 157, 0.4);
    background: linear-gradient(135deg, #FF8FA3 0%, #D63384 100%);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 4px 12px rgba(196, 69, 105, 0.2);
  }
  
  @media (min-width: 768px) {
    padding: 12px 24px;
    font-size: 15px;
    gap: 10px;
  }
  
  @media (min-width: 992px) {
    padding: 14px 28px;
    font-size: 16px;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 32px;
  overflow-x: hidden;
  position: relative;
  width: 100%;
  
  @media (min-width: 576px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
  }
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 28px;
  }
  
  @media (min-width: 992px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 32px;
  }
`;

const Card = styled(motion.div)`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  padding: 24px;
  border: 1px solid rgba(0, 0, 0, 0.02);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #1976D2, #64B5F6, #42A5F5);
    border-radius: 16px 16px 0 0;
  }
  
  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
    
    &::before {
      background: linear-gradient(90deg, #FFD700, #FFA500, #FF8C00);
    }
  }
  
  h3 {
    color: #1a202c;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
    
    svg {
      color: #1976D2;
      padding: 8px;
      background: rgba(25, 118, 210, 0.1);
      border-radius: 8px;
      font-size: 20px;
      transition: all 0.3s ease;
    }
  }
  
  p {
    color: #4a5568;
    line-height: 1.7;
    font-size: 15px;
    font-weight: 400;
  }
  
  &:hover h3 svg {
    background: rgba(255, 215, 0, 0.2);
    color: #FF8C00;
    transform: scale(1.1);
  }
  
  @media (min-width: 768px) {
    padding: 28px;
    
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
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <h3>
              <FiHome />
              Dashboard Overview
            </h3>
            <p>
              Welcome to your modern admin dashboard! Manage your content with ease using our intuitive interface. 
              Track analytics, manage users, and control every aspect of your platform from this central hub.
            </p>
          </Card>

          <Card
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <h3>
              <FiUser />
              User Management
            </h3>
            <p>
              Efficiently manage user accounts, permissions, and access levels. Monitor user activity, 
              update profiles, and ensure security compliance across your platform.
            </p>
          </Card>

          <Card
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 100 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <h3>
              <FiSettings />
              System Settings
            </h3>
            <p>
              Configure your application preferences, manage themes, and customize your admin experience. 
              Current theme: {selectedTheme === 'golden' ? 'Golden Luxury' : 'Emerald Professional'} mode.
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

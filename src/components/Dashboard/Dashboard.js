import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiLogOut, FiUser, FiSettings, FiHome } from 'react-icons/fi';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
  padding: 20px;
`;

const Header = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 20px 32px;
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const WelcomeText = styled.div`
  color: #ffffff;
  
  h1 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
  }
`;

const LogoutButton = styled(motion.button)`
  background: linear-gradient(135deg, #FF6B9D 0%, #C44569 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(255, 107, 157, 0.3);
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  h3 {
    color: #ffffff;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
  }
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { selectedTheme } = useSelector((state) => state.theme);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <DashboardContainer>
      <Header>
        <WelcomeText>
          <h1>Welcome back, {user?.name || 'Admin'}!</h1>
          <p>Current theme: {selectedTheme === 'golden' ? 'Golden (Luxury & Elegance)' : 'Pink (Modern & Vibrant)'}</p>
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
            The current theme selection is: {selectedTheme === 'golden' ? 'Golden' : 'Pink'}.
          </p>
        </Card>
      </ContentGrid>
    </DashboardContainer>
  );
};

export default Dashboard;

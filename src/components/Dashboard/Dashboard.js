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
  background: ${props => props.theme === 'golden' 
    ? `
      linear-gradient(135deg, #fffdf7 0%, #fefce8 15%, #fef3c7 35%, #fed7aa 55%, #fecaca 75%, #fef3c7 100%),
      radial-gradient(ellipse at top, rgba(255, 215, 0, 0.15) 0%, transparent 60%),
      radial-gradient(ellipse at bottom, rgba(255, 140, 0, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse 1200px 800px at 25% 25%, rgba(255, 193, 7, 0.08) 0%, transparent 50%),
      radial-gradient(ellipse 1000px 600px at 75% 75%, rgba(218, 165, 32, 0.06) 0%, transparent 40%)
    `
    : `
      linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 15%, #d1fae5 35%, #a7f3d0 55%, #6ee7b7 75%, #ecfdf5 100%),
      radial-gradient(ellipse at top, rgba(16, 185, 129, 0.15) 0%, transparent 60%),
      radial-gradient(ellipse at bottom, rgba(5, 150, 105, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse 1200px 800px at 25% 25%, rgba(6, 78, 59, 0.08) 0%, transparent 50%),
      radial-gradient(ellipse 1000px 600px at 75% 75%, rgba(4, 120, 87, 0.06) 0%, transparent 40%)
    `};
  background-attachment: fixed;
  background-size: 100% 100%, 120% 120%, 150% 150%, 200% 200%, 180% 180%;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  
  /* Add sophisticated animated background patterns with improved performance */
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme === 'golden' 
      ? `
        radial-gradient(circle at 15% 20%, rgba(255, 215, 0, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 85% 30%, rgba(255, 140, 0, 0.06) 0%, transparent 45%),
        radial-gradient(circle at 45% 70%, rgba(255, 165, 0, 0.05) 0%, transparent 35%),
        radial-gradient(circle at 75% 80%, rgba(218, 165, 32, 0.04) 0%, transparent 50%),
        radial-gradient(circle at 25% 90%, rgba(255, 193, 7, 0.03) 0%, transparent 40%),
        linear-gradient(45deg, transparent 40%, rgba(255, 215, 0, 0.02) 50%, transparent 60%),
        conic-gradient(from 0deg at 50% 50%, rgba(255, 215, 0, 0.02) 0deg, transparent 60deg, rgba(255, 165, 0, 0.01) 120deg, transparent 180deg)
      `
      : `
        radial-gradient(circle at 15% 20%, rgba(16, 185, 129, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 85% 30%, rgba(5, 150, 105, 0.06) 0%, transparent 45%),
        radial-gradient(circle at 45% 70%, rgba(4, 120, 87, 0.05) 0%, transparent 35%),
        radial-gradient(circle at 75% 80%, rgba(6, 95, 70, 0.04) 0%, transparent 50%),
        radial-gradient(circle at 25% 90%, rgba(6, 78, 59, 0.03) 0%, transparent 40%),
        linear-gradient(45deg, transparent 40%, rgba(16, 185, 129, 0.02) 50%, transparent 60%),
        conic-gradient(from 0deg at 50% 50%, rgba(16, 185, 129, 0.02) 0deg, transparent 60deg, rgba(5, 150, 105, 0.01) 120deg, transparent 180deg)
      `};
    background-size: 300px 300px, 400px 400px, 250px 250px, 350px 350px, 280px 280px, 200px 200px, 500px 500px;
    animation: backgroundShift 40s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
    will-change: transform, opacity;
  }
  
  /* Add elegant floating particles effect with better performance */
  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme === 'golden' 
      ? `
        radial-gradient(2px 2px at 20px 30px, rgba(255, 215, 0, 0.3), transparent),
        radial-gradient(2px 2px at 40px 70px, rgba(255, 165, 0, 0.2), transparent),
        radial-gradient(1px 1px at 90px 40px, rgba(255, 140, 0, 0.4), transparent),
        radial-gradient(1px 1px at 130px 80px, rgba(218, 165, 32, 0.3), transparent),
        radial-gradient(2px 2px at 160px 30px, rgba(255, 193, 7, 0.2), transparent),
        radial-gradient(1px 1px at 200px 90px, rgba(255, 215, 0, 0.25), transparent)
      `
      : `
        radial-gradient(2px 2px at 20px 30px, rgba(16, 185, 129, 0.3), transparent),
        radial-gradient(2px 2px at 40px 70px, rgba(5, 150, 105, 0.2), transparent),
        radial-gradient(1px 1px at 90px 40px, rgba(4, 120, 87, 0.4), transparent),
        radial-gradient(1px 1px at 130px 80px, rgba(6, 95, 70, 0.3), transparent),
        radial-gradient(2px 2px at 160px 30px, rgba(6, 78, 59, 0.2), transparent),
        radial-gradient(1px 1px at 200px 90px, rgba(16, 185, 129, 0.25), transparent)
      `};
    background-repeat: repeat;
    background-size: 200px 100px;
    animation: particleFloat 50s linear infinite;
    pointer-events: none;
    z-index: 0;
    opacity: 0.6;
    will-change: transform;
  }
  
  @keyframes backgroundShift {
    0%, 100% { 
      opacity: 1; 
      transform: scale(1) rotate(0deg) translateX(0px); 
    }
    20% { 
      opacity: 0.8; 
      transform: scale(1.05) rotate(0.5deg) translateX(-2px); 
    }
    40% { 
      opacity: 0.9; 
      transform: scale(1.1) rotate(-0.3deg) translateX(3px); 
    }
    60% { 
      opacity: 0.7; 
      transform: scale(1.03) rotate(0.2deg) translateX(-1px); 
    }
    80% { 
      opacity: 0.85; 
      transform: scale(1.07) rotate(-0.1deg) translateX(1px); 
    }
  }
  
  @keyframes particleFloat {
    0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
    25% { transform: translateY(-10px) translateX(5px) rotate(1deg); }
    50% { transform: translateY(5px) translateX(-3px) rotate(-0.5deg); }
    75% { transform: translateY(-7px) translateX(2px) rotate(0.3deg); }
    100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
  }
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
  
  /* Add scroll snap for smoother navigation */
  scroll-snap-type: y mandatory;
  scroll-padding-top: 20px;
`;

const Sidebar = styled.div`
  width: 100%;
  background: ${props => props.theme === 'golden' 
    ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #FF8C00 50%, #DAA520 75%, #B8860B 100%)' 
    : 'linear-gradient(135deg, #10B981 0%, #059669 25%, #047857 50%, #065f46 75%, #064e3b 100%)'};
  padding: 0;
  height: auto;
  z-index: 100;
  box-shadow: ${props => props.theme === 'golden' 
    ? '0 4px 20px rgba(255, 165, 0, 0.3), 0 0 40px rgba(255, 215, 0, 0.1)' 
    : '0 4px 20px rgba(16, 185, 129, 0.3), 0 0 40px rgba(5, 150, 105, 0.1)'};
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(15px);
  border-right: ${props => props.theme === 'golden' 
    ? '1px solid rgba(255, 215, 0, 0.2)' 
    : '1px solid rgba(16, 185, 129, 0.2)'};
  
  /* Add subtle glow effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme === 'golden' 
      ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, transparent 100%)' 
      : 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, transparent 100%)'};
    pointer-events: none;
  }
  
  @media (min-width: 768px) {
    width: 260px;
    height: 100vh;
    position: fixed;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    
    /* Customize scrollbar */
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: ${props => props.theme === 'golden' 
        ? 'rgba(255, 215, 0, 0.4)' 
        : 'rgba(16, 185, 129, 0.4)'};
      border-radius: 3px;
      
      &:hover {
        background: ${props => props.theme === 'golden' 
          ? 'rgba(255, 215, 0, 0.6)' 
          : 'rgba(16, 185, 129, 0.6)'};
      }
    }
  }
`;

const Logo = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 800;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: ${props => props.theme === 'golden' 
    ? 'linear-gradient(135deg, rgba(255, 140, 0, 0.3) 0%, rgba(218, 165, 32, 0.2) 100%)' 
    : 'linear-gradient(135deg, rgba(4, 120, 87, 0.3) 0%, rgba(6, 78, 59, 0.2) 100%)'};
  box-shadow: ${props => props.theme === 'golden' 
    ? '0 4px 15px rgba(255, 165, 0, 0.2)' 
    : '0 4px 15px rgba(16, 185, 129, 0.2)'};
  position: relative;
  z-index: 101;
  backdrop-filter: blur(15px);
  border-bottom: ${props => props.theme === 'golden' 
    ? '2px solid rgba(255, 215, 0, 0.3)' 
    : '2px solid rgba(16, 185, 129, 0.3)'};
  
  /* Add elegant text shadow */
  text-shadow: ${props => props.theme === 'golden' 
    ? '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.3)' 
    : '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 20px rgba(16, 185, 129, 0.3)'};
  
  /* Add subtle animation */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme === 'golden' 
      ? 'linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)' 
      : 'linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)'};
    animation: shimmer 3s ease-in-out infinite;
    pointer-events: none;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  @media (min-width: 768px) {
    font-size: 24px;
    padding: 25px 20px;
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
  background: ${props => props.theme === 'golden' 
    ? `
      linear-gradient(135deg, 
        rgba(255, 253, 245, 0.98) 0%, 
        rgba(254, 252, 232, 0.95) 15%, 
        rgba(255, 251, 235, 0.90) 30%, 
        rgba(255, 255, 255, 0.92) 45%, 
        rgba(254, 252, 232, 0.95) 60%, 
        rgba(255, 251, 235, 0.90) 75%, 
        rgba(255, 253, 245, 0.98) 100%
      ),
      radial-gradient(ellipse 1000px 700px at 30% 0%, rgba(255, 215, 0, 0.08) 0%, transparent 50%),
      radial-gradient(ellipse 800px 500px at 70% 100%, rgba(255, 165, 0, 0.06) 0%, transparent 40%),
      radial-gradient(ellipse 600px 400px at 0% 50%, rgba(218, 165, 32, 0.04) 0%, transparent 35%)
    `
    : `
      linear-gradient(135deg, 
        rgba(240, 253, 249, 0.98) 0%, 
        rgba(236, 253, 245, 0.95) 15%, 
        rgba(209, 250, 229, 0.90) 30%, 
        rgba(255, 255, 255, 0.92) 45%, 
        rgba(236, 253, 245, 0.95) 60%, 
        rgba(209, 250, 229, 0.90) 75%, 
        rgba(240, 253, 249, 0.98) 100%
      ),
      radial-gradient(ellipse 1000px 700px at 30% 0%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
      radial-gradient(ellipse 800px 500px at 70% 100%, rgba(5, 150, 105, 0.06) 0%, transparent 40%),
      radial-gradient(ellipse 600px 400px at 0% 50%, rgba(4, 120, 87, 0.04) 0%, transparent 35%)
    `};
  background-blend-mode: multiply, overlay, soft-light, luminosity;
  background-attachment: local;
  border-radius: 0;
  padding: 15px;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  min-height: 100vh;
  position: relative;
  margin-top: 60px;
  z-index: 1;
  backdrop-filter: blur(15px);
  scroll-behavior: smooth;
  overscroll-behavior: contain;
  scroll-snap-type: y proximity;
  scroll-padding-top: 20px;
  
  /* Add sophisticated texture overlay with improved performance */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${props => props.theme === 'golden' 
      ? `
        radial-gradient(circle at 3px 3px, rgba(255, 215, 0, 0.15) 2px, transparent 0),
        radial-gradient(circle at 15px 15px, rgba(255, 165, 0, 0.08) 1px, transparent 0),
        radial-gradient(circle at 25px 25px, rgba(218, 165, 32, 0.06) 1.5px, transparent 0),
        linear-gradient(135deg, transparent 30%, rgba(255, 140, 0, 0.03) 50%, transparent 70%),
        linear-gradient(45deg, rgba(218, 165, 32, 0.02) 25%, transparent 25%, transparent 75%, rgba(255, 193, 7, 0.02) 75%),
        conic-gradient(from 0deg at 50% 50%, rgba(255, 215, 0, 0.01) 0deg, transparent 90deg, rgba(255, 165, 0, 0.01) 180deg, transparent 270deg)
      `
      : `
        radial-gradient(circle at 3px 3px, rgba(16, 185, 129, 0.15) 2px, transparent 0),
        radial-gradient(circle at 15px 15px, rgba(5, 150, 105, 0.08) 1px, transparent 0),
        radial-gradient(circle at 25px 25px, rgba(4, 120, 87, 0.06) 1.5px, transparent 0),
        linear-gradient(135deg, transparent 30%, rgba(4, 120, 87, 0.03) 50%, transparent 70%),
        linear-gradient(45deg, rgba(6, 95, 70, 0.02) 25%, transparent 25%, transparent 75%, rgba(6, 78, 59, 0.02) 75%),
        conic-gradient(from 0deg at 50% 50%, rgba(16, 185, 129, 0.01) 0deg, transparent 90deg, rgba(5, 150, 105, 0.01) 180deg, transparent 270deg)
      `};
    background-size: 25px 25px, 30px 30px, 35px 35px, 300px 300px, 50px 50px, 400px 400px;
    animation: textureFloat 45s linear infinite;
    pointer-events: none;
    z-index: -1;
    opacity: 0.7;
    will-change: transform;
  }
  
  /* Add enhanced glass morphism effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme === 'golden' 
      ? `
        linear-gradient(135deg, 
          rgba(255, 255, 255, 0.12) 0%, 
          rgba(255, 252, 235, 0.06) 20%, 
          rgba(255, 255, 255, 0.10) 40%, 
          rgba(254, 250, 224, 0.08) 60%, 
          rgba(255, 255, 255, 0.12) 80%, 
          rgba(255, 252, 235, 0.06) 100%
        ),
        radial-gradient(ellipse at top left, rgba(255, 215, 0, 0.03) 0%, transparent 50%),
        radial-gradient(ellipse at bottom right, rgba(255, 165, 0, 0.02) 0%, transparent 40%)
      `
      : `
        linear-gradient(135deg, 
          rgba(255, 255, 255, 0.12) 0%, 
          rgba(240, 253, 249, 0.06) 20%, 
          rgba(255, 255, 255, 0.10) 40%, 
          rgba(236, 253, 245, 0.08) 60%, 
          rgba(255, 255, 255, 0.12) 80%, 
          rgba(240, 253, 249, 0.06) 100%
        ),
        radial-gradient(ellipse at top left, rgba(16, 185, 129, 0.03) 0%, transparent 50%),
        radial-gradient(ellipse at bottom right, rgba(5, 150, 105, 0.02) 0%, transparent 40%)
      `};
    backdrop-filter: blur(3px) saturate(1.2);
    border-radius: 0;
    pointer-events: none;
    z-index: -1;
    animation: glassShimmer 30s ease-in-out infinite;
  }
  
  @keyframes textureFloat {
    0% { transform: translate(0, 0) rotate(0deg) scale(1); }
    20% { transform: translate(-2px, -3px) rotate(0.5deg) scale(1.01); }
    40% { transform: translate(3px, -2px) rotate(-0.3deg) scale(0.99); }
    60% { transform: translate(-1px, 2px) rotate(0.2deg) scale(1.02); }
    80% { transform: translate(2px, -1px) rotate(-0.1deg) scale(1.01); }
    100% { transform: translate(0, 0) rotate(0deg) scale(1); }
  }
  
  @keyframes glassShimmer {
    0%, 100% { opacity: 1; transform: translateX(0px); }
    25% { opacity: 0.8; transform: translateX(-2px); }
    50% { opacity: 0.9; transform: translateX(2px); }
    75% { opacity: 0.85; transform: translateX(-1px); }
  }
  
  /* Ultra-smooth responsive scrollbar with elegant design */
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme === 'golden' 
      ? 'linear-gradient(180deg, rgba(255, 215, 0, 0.08) 0%, rgba(255, 165, 0, 0.04) 100%)' 
      : 'linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.04) 100%)'};
    border-radius: 6px;
    border: ${props => props.theme === 'golden' 
      ? '1px solid rgba(255, 215, 0, 0.1)' 
      : '1px solid rgba(16, 185, 129, 0.1)'};
    margin: 4px 0;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme === 'golden' 
      ? 'linear-gradient(180deg, #FFD700 0%, #FFA500 30%, #FF8C00 70%, #DAA520 100%)' 
      : 'linear-gradient(180deg, #10B981 0%, #059669 30%, #047857 70%, #065f46 100%)'};
    border-radius: 6px;
    border: ${props => props.theme === 'golden' 
      ? '1px solid rgba(255, 215, 0, 0.3)' 
      : '1px solid rgba(16, 185, 129, 0.3)'};
    box-shadow: ${props => props.theme === 'golden' 
      ? '0 2px 8px rgba(255, 165, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
      : '0 2px 8px rgba(16, 185, 129, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)'};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      background: ${props => props.theme === 'golden' 
        ? 'linear-gradient(180deg, #FFED4E 0%, #FFB800 30%, #FF7F00 70%, #B8860B 100%)' 
        : 'linear-gradient(180deg, #34D399 0%, #10B981 30%, #047857 70%, #064e3b 100%)'};
      box-shadow: ${props => props.theme === 'golden' 
        ? '0 4px 12px rgba(255, 165, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4)' 
        : '0 4px 12px rgba(16, 185, 129, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4)'};
      transform: scaleY(1.1);
    }
    
    &:active {
      background: ${props => props.theme === 'golden' 
        ? 'linear-gradient(180deg, #FFC107 0%, #FF9800 50%, #FF5722 100%)' 
        : 'linear-gradient(180deg, #059669 0%, #047857 50%, #065f46 100%)'};
    }
  }
  
  /* Mobile responsive adjustments with enhanced touch experience */
  @media (max-width: 767px) {
    padding: 12px;
    margin-top: 65px;
    scroll-snap-type: y mandatory;
    
    &::-webkit-scrollbar {
      width: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      border: none;
    }
  }
  
  @media (min-width: 768px) {
    padding: 25px;
    margin-left: 260px;
    margin-top: 0;
    min-height: 100vh;
    
    &::-webkit-scrollbar {
      width: 8px;
    }
  }
  
  @media (min-width: 1024px) {
    padding: 30px;
    
    &::-webkit-scrollbar {
      width: 10px;
    }
  }
  
  @media (min-width: 1200px) {
    padding: 35px;
  }
  
  @media (min-width: 1400px) {
    padding: 40px;
  }
`;

const Header = styled.div`
  background: ${props => props.theme === 'golden' 
    ? `
      linear-gradient(135deg, 
        rgba(255, 253, 245, 0.98) 0%, 
        rgba(254, 251, 224, 0.95) 15%, 
        rgba(255, 255, 255, 0.92) 30%, 
        rgba(254, 250, 224, 0.95) 50%, 
        rgba(255, 252, 235, 0.96) 70%, 
        rgba(255, 253, 245, 0.98) 100%
      )
    `
    : `
      linear-gradient(135deg, 
        rgba(240, 253, 249, 0.98) 0%, 
        rgba(225, 253, 238, 0.95) 15%, 
        rgba(255, 255, 255, 0.92) 30%, 
        rgba(209, 250, 229, 0.95) 50%, 
        rgba(167, 243, 208, 0.96) 70%, 
        rgba(240, 253, 249, 0.98) 100%
      )
    `};
  border-radius: 24px;
  padding: 30px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${props => props.theme === 'golden' 
    ? '3px solid rgba(255, 215, 0, 0.25)' 
    : '3px solid rgba(16, 185, 129, 0.25)'};
  box-shadow: ${props => props.theme === 'golden' 
    ? `
      0 12px 40px rgba(255, 165, 0, 0.15), 
      0 0 60px rgba(255, 215, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      inset 0 -1px 0 rgba(255, 215, 0, 0.1)
    ` 
    : `
      0 12px 40px rgba(16, 185, 129, 0.15), 
      0 0 60px rgba(5, 150, 105, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      inset 0 -1px 0 rgba(16, 185, 129, 0.1)
    `};
  position: sticky;
  top: 15px;
  z-index: 10;
  backdrop-filter: blur(30px);
  
  /* Add elegant hover effect */
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: ${props => props.theme === 'golden' 
      ? `
        0 16px 50px rgba(255, 165, 0, 0.2), 
        0 0 80px rgba(255, 215, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 -1px 0 rgba(255, 215, 0, 0.15)
      ` 
      : `
        0 16px 50px rgba(16, 185, 129, 0.2), 
        0 0 80px rgba(5, 150, 105, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 -1px 0 rgba(16, 185, 129, 0.15)
      `};
    border-color: ${props => props.theme === 'golden' 
      ? 'rgba(255, 215, 0, 0.4)' 
      : 'rgba(16, 185, 129, 0.4)'};
  }
  
  /* Add sophisticated pattern */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme === 'golden' 
      ? `
        radial-gradient(circle at 10% 20%, rgba(255, 215, 0, 0.08) 0%, transparent 30%),
        radial-gradient(circle at 90% 80%, rgba(255, 165, 0, 0.06) 0%, transparent 25%),
        linear-gradient(135deg, transparent 45%, rgba(218, 165, 32, 0.03) 50%, transparent 55%)
      ` 
      : `
        radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.08) 0%, transparent 30%),
        radial-gradient(circle at 90% 80%, rgba(5, 150, 105, 0.06) 0%, transparent 25%),
        linear-gradient(135deg, transparent 45%, rgba(4, 120, 87, 0.03) 50%, transparent 55%)
      `};
    background-size: 300px 300px, 250px 250px, 400px 400px;
    border-radius: 24px;
    pointer-events: none;
    animation: headerPattern 25s linear infinite;
  }
  
  @keyframes headerPattern {
    0% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(-5px, -2px) rotate(0.5deg); }
    50% { transform: translate(3px, -3px) rotate(-0.3deg); }
    75% { transform: translate(-2px, 2px) rotate(0.2deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
  }
  
  @media (min-width: 768px) {
    padding: 35px 45px;
    margin-bottom: 40px;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 28px;
  }
`;

const WelcomeText = styled.div`
  color: #333;
  text-align: center;
  margin-bottom: 15px;
  
  h1 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
    background: ${props => props.theme === 'golden' 
      ? 'linear-gradient(135deg, #DAA520 0%, #FFD700 30%, #FFA500 70%, #FF8C00 100%)' 
      : 'linear-gradient(135deg, #065f46 0%, #10B981 30%, #34D399 70%, #6EE7B7 100%)'};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
    position: relative;
    text-shadow: ${props => props.theme === 'golden' 
      ? '0 0 20px rgba(255, 215, 0, 0.3)' 
      : '0 0 20px rgba(16, 185, 129, 0.3)'};
    
    &::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      width: 100%;
      height: 3px;
      background: ${props => props.theme === 'golden' 
        ? 'linear-gradient(90deg, #FFD700, rgba(255, 215, 0, 0.3), transparent)' 
        : 'linear-gradient(90deg, #10B981, rgba(16, 185, 129, 0.3), transparent)'};
      border-radius: 3px;
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
  background: ${props => props.theme === 'golden' 
    ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD23F 100%)' 
    : 'linear-gradient(135deg, #EC4899 0%, #BE185D 50%, #9D174D 100%)'};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 15px;
  box-shadow: ${props => props.theme === 'golden' 
    ? '0 4px 16px rgba(255, 107, 53, 0.3), 0 0 20px rgba(255, 210, 63, 0.2)' 
    : '0 4px 16px rgba(236, 72, 153, 0.3), 0 0 20px rgba(157, 23, 77, 0.2)'};
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: ${props => props.theme === 'golden' 
    ? '1px solid rgba(255, 210, 63, 0.3)' 
    : '1px solid rgba(236, 72, 153, 0.3)'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: ${props => props.theme === 'golden' 
      ? '0 8px 24px rgba(255, 107, 53, 0.4), 0 0 30px rgba(255, 210, 63, 0.3)' 
      : '0 8px 24px rgba(236, 72, 153, 0.4), 0 0 30px rgba(157, 23, 77, 0.3)'};
    background: ${props => props.theme === 'golden' 
      ? 'linear-gradient(135deg, #FF8A50 0%, #F7931E 30%, #FFD23F 70%, #FFED4E 100%)' 
      : 'linear-gradient(135deg, #F472B6 0%, #EC4899 30%, #BE185D 70%, #9D174D 100%)'};
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
    box-shadow: ${props => props.theme === 'golden' 
      ? '0 4px 12px rgba(255, 107, 53, 0.2)' 
      : '0 4px 12px rgba(236, 72, 153, 0.2)'};
  }
  
  @media (min-width: 768px) {
    padding: 14px 28px;
    font-size: 16px;
    gap: 12px;
    border-radius: 18px;
  }
  
  @media (min-width: 992px) {
    padding: 16px 32px;
    font-size: 17px;
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
  background: ${props => props.theme === 'golden' 
    ? `
      linear-gradient(135deg, 
        rgba(255, 253, 245, 0.99) 0%, 
        rgba(254, 252, 232, 0.97) 15%, 
        rgba(255, 255, 255, 0.95) 30%, 
        rgba(254, 250, 224, 0.97) 45%, 
        rgba(255, 252, 235, 0.98) 60%, 
        rgba(255, 255, 255, 0.96) 75%, 
        rgba(255, 253, 245, 0.99) 100%
      )
    `
    : `
      linear-gradient(135deg, 
        rgba(240, 253, 249, 0.99) 0%, 
        rgba(236, 253, 245, 0.97) 15%, 
        rgba(255, 255, 255, 0.95) 30%, 
        rgba(209, 250, 229, 0.97) 45%, 
        rgba(167, 243, 208, 0.98) 60%, 
        rgba(255, 255, 255, 0.96) 75%, 
        rgba(240, 253, 249, 0.99) 100%
      )
    `};
  border-radius: 28px;
  box-shadow: ${props => props.theme === 'golden' 
    ? `
      0 10px 40px rgba(255, 165, 0, 0.15), 
      0 0 60px rgba(255, 215, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.4),
      inset 0 -1px 0 rgba(255, 215, 0, 0.15),
      0 4px 20px rgba(255, 140, 0, 0.08)
    ` 
    : `
      0 10px 40px rgba(16, 185, 129, 0.15), 
      0 0 60px rgba(5, 150, 105, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.4),
      inset 0 -1px 0 rgba(16, 185, 129, 0.15),
      0 4px 20px rgba(4, 120, 87, 0.08)
    `};
  padding: 36px;
  border: ${props => props.theme === 'golden' 
    ? '2px solid rgba(255, 215, 0, 0.25)' 
    : '2px solid rgba(16, 185, 129, 0.25)'};
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(30px);
  scroll-snap-align: start;
  
  /* Elegant animated top accent with enhanced gradient */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: ${props => props.theme === 'golden' 
      ? 'linear-gradient(90deg, #FFD700 0%, #FFA500 20%, #FF8C00 40%, #DAA520 60%, #B8860B 80%, #FFD700 100%)' 
      : 'linear-gradient(90deg, #10B981 0%, #059669 20%, #047857 40%, #065f46 60%, #064e3b 80%, #10B981 100%)'};
    background-size: 300% 100%;
    border-radius: 28px 28px 0 0;
    animation: gradientShift 4s ease-in-out infinite;
    box-shadow: ${props => props.theme === 'golden' 
      ? '0 2px 8px rgba(255, 165, 0, 0.3)' 
      : '0 2px 8px rgba(16, 185, 129, 0.3)'};
  }
  
  /* Sophisticated multi-layered pattern overlay */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme === 'golden' 
      ? `
        radial-gradient(circle at 15% 15%, rgba(255, 215, 0, 0.06) 0%, transparent 30%),
        radial-gradient(circle at 85% 85%, rgba(255, 165, 0, 0.05) 0%, transparent 35%),
        radial-gradient(circle at 50% 30%, rgba(218, 165, 32, 0.04) 0%, transparent 25%),
        radial-gradient(circle at 30% 80%, rgba(255, 193, 7, 0.03) 0%, transparent 20%),
        linear-gradient(135deg, transparent 40%, rgba(255, 140, 0, 0.02) 50%, transparent 60%),
        conic-gradient(from 45deg at 70% 20%, rgba(255, 215, 0, 0.02) 0deg, transparent 120deg, rgba(255, 165, 0, 0.01) 240deg, transparent 360deg)
      `
      : `
        radial-gradient(circle at 15% 15%, rgba(16, 185, 129, 0.06) 0%, transparent 30%),
        radial-gradient(circle at 85% 85%, rgba(5, 150, 105, 0.05) 0%, transparent 35%),
        radial-gradient(circle at 50% 30%, rgba(4, 120, 87, 0.04) 0%, transparent 25%),
        radial-gradient(circle at 30% 80%, rgba(6, 78, 59, 0.03) 0%, transparent 20%),
        linear-gradient(135deg, transparent 40%, rgba(4, 120, 87, 0.02) 50%, transparent 60%),
        conic-gradient(from 45deg at 70% 20%, rgba(16, 185, 129, 0.02) 0deg, transparent 120deg, rgba(5, 150, 105, 0.01) 240deg, transparent 360deg)
      `};
    border-radius: 28px;
    pointer-events: none;
    animation: patternFlow 35s linear infinite;
  }
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; transform: scaleX(1); }
    25% { background-position: 50% 50%; transform: scaleX(1.02); }
    50% { background-position: 100% 50%; transform: scaleX(1); }
    75% { background-position: 150% 50%; transform: scaleX(1.01); }
  }
  
  @keyframes patternFlow {
    0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.7; }
    25% { transform: translate(-2px, -1px) rotate(0.5deg) scale(1.01); opacity: 0.6; }
    50% { transform: translate(1px, -2px) rotate(-0.3deg) scale(0.99); opacity: 0.8; }
    75% { transform: translate(-1px, 1px) rotate(0.2deg) scale(1.01); opacity: 0.65; }
    100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.7; }
  }
  
  &:hover {
    transform: translateY(-12px) scale(1.04) rotateX(2deg);
    box-shadow: ${props => props.theme === 'golden' 
      ? `
        0 25px 80px rgba(255, 165, 0, 0.22), 
        0 0 100px rgba(255, 215, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.5),
        inset 0 -1px 0 rgba(255, 215, 0, 0.2),
        0 8px 30px rgba(255, 140, 0, 0.12)
      ` 
      : `
        0 25px 80px rgba(16, 185, 129, 0.22), 
        0 0 100px rgba(5, 150, 105, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.5),
        inset 0 -1px 0 rgba(16, 185, 129, 0.2),
        0 8px 30px rgba(4, 120, 87, 0.12)
      `};
    border-color: ${props => props.theme === 'golden' 
      ? 'rgba(255, 215, 0, 0.5)' 
      : 'rgba(16, 185, 129, 0.5)'};
    backdrop-filter: blur(35px) saturate(1.3);
    
    &::before {
      height: 8px;
      animation-duration: 2.5s;
      box-shadow: ${props => props.theme === 'golden' 
        ? '0 4px 12px rgba(255, 165, 0, 0.4)' 
        : '0 4px 12px rgba(16, 185, 129, 0.4)'};
    }
    
    &::after {
      animation-duration: 25s;
      opacity: 0.9;
    }
  }
  
  h3 {
    color: ${props => props.theme === 'golden' 
      ? '#B8860B' 
      : '#064e3b'};
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    position: relative;
    z-index: 1;
    line-height: 1.3;
    
    svg {
      color: ${props => props.theme === 'golden' 
        ? '#DAA520' 
        : '#10B981'};
      padding: 12px;
      background: ${props => props.theme === 'golden' 
        ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.18) 0%, rgba(255, 165, 0, 0.12) 100%)' 
        : 'linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(5, 150, 105, 0.12) 100%)'};
      border-radius: 16px;
      font-size: 24px;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border: ${props => props.theme === 'golden' 
        ? '2px solid rgba(255, 215, 0, 0.25)' 
        : '2px solid rgba(16, 185, 129, 0.25)'};
      box-shadow: ${props => props.theme === 'golden' 
        ? '0 4px 12px rgba(255, 165, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
        : '0 4px 12px rgba(16, 185, 129, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'};
    }
  }
  
  p {
    color: ${props => props.theme === 'golden' 
      ? '#8B7355' 
      : '#065f46'};
    line-height: 1.8;
    font-size: 16px;
    font-weight: 400;
    position: relative;
    z-index: 1;
    opacity: 0.9;
    letter-spacing: 0.2px;
  }
  
  &:hover h3 svg {
    background: ${props => props.theme === 'golden' 
      ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(255, 140, 0, 0.25) 100%)' 
      : 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.25) 100%)'};
    color: ${props => props.theme === 'golden' 
      ? '#FF8C00' 
      : '#047857'};
    transform: scale(1.15) rotate(8deg) translateY(-2px);
    box-shadow: ${props => props.theme === 'golden' 
      ? '0 6px 18px rgba(255, 165, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4)' 
      : '0 6px 18px rgba(16, 185, 129, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4)'};
    border-color: ${props => props.theme === 'golden' 
      ? 'rgba(255, 215, 0, 0.4)' 
      : 'rgba(16, 185, 129, 0.4)'};
  }
  
  /* Responsive adjustments */
  @media (max-width: 576px) {
    padding: 28px;
    border-radius: 24px;
    
    h3 {
      font-size: 20px;
      margin-bottom: 16px;
      gap: 12px;
      
      svg {
        padding: 10px;
        font-size: 20px;
        border-radius: 12px;
      }
    }
    
    p {
      font-size: 15px;
      line-height: 1.7;
    }
  }
  
  @media (min-width: 768px) {
    padding: 32px;
    border-radius: 26px;
    
    h3 {
      font-size: 22px;
      margin-bottom: 18px;
      gap: 14px;
    }
    
    p {
      font-size: 15px;
    }
  }
  
  @media (min-width: 992px) {
    padding: 36px;
    border-radius: 28px;
  }
  
  @media (min-width: 1200px) {
    padding: 40px;
    border-radius: 30px;
    
    h3 {
      font-size: 24px;
      
      svg {
        padding: 14px;
        font-size: 26px;
      }
    }
    
    p {
      font-size: 16px;
    }
  }
`;

const Dashboard = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { currentTheme } = useSelector((state) => state.theme);
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
        <Header theme={currentTheme}>
          <WelcomeText theme={currentTheme}>
            <h1>Welcome back, {user?.name || 'Admin'}!</h1>
            <p>Current theme: {currentTheme === 'golden' ? 'Golden (Luxury & Elegance)' : 'Emerald (Modern & Professional)'}</p>
          </WelcomeText>
          <LogoutButton
            theme={currentTheme}
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
            theme={currentTheme}
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
            theme={currentTheme}
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
            theme={currentTheme}
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
              Current theme: {currentTheme === 'golden' ? 'Golden Luxury' : 'Emerald Professional'} mode.
            </p>
          </Card>
        </ContentGrid>
      </>
    );
  };

  return (
    <DashboardContainer theme={currentTheme}>
      <Sidebar theme={currentTheme}>
        <Logo theme={currentTheme}>
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
            theme={currentTheme}
            className={location.pathname === '/dashboard' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            <FiHome /> Home
          </NavItem>
          <NavItem 
            to="/users" 
            theme={currentTheme}
            className={location.pathname === '/users' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            <FiUsers /> Users
          </NavItem>
          <NavItem 
            to="/genre" 
            theme={currentTheme}
            className={location.pathname === '/genre' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            <HiOutlineTag /> Genre
          </NavItem>
          <NavItem 
            to="/tags" 
            theme={currentTheme}
            className={location.pathname === '/tags' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            <HiOutlineTag /> Tags
          </NavItem>
          <NavItem 
            to="/watch-age" 
            theme={currentTheme}
            className={location.pathname === '/watch-age' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            <FiUsers /> Watch-age
          </NavItem>
          <NavItem 
            to="/slider" 
            theme={currentTheme}
            className={location.pathname === '/slider' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            <FiImage /> Slider
          </NavItem>
          <NavItem 
            to="/webseries" 
            theme={currentTheme}
            className={location.pathname === '/webseries' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            <FiFileText /> Webseries
          </NavItem>
          <NavItem 
            to="/movies" 
            theme={currentTheme}
            className={location.pathname === '/movies' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            <FiFileText /> Movies
          </NavItem>
          <NavItem 
            to="/contents" 
            theme={currentTheme}
            className={location.pathname === '/contents' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            <FiFileText /> Upload Content
          </NavItem>
          <NavItem 
            to="/trending" 
            theme={currentTheme}
            className={location.pathname === '/trending' ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            <FiBarChart2 /> Trending
          </NavItem>
          <NavItem
            to="/" 
            theme={currentTheme}
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
          >
            <FiLogOut /> Logout
          </NavItem>
        </NavMenu>
      </Sidebar>
      
      <MainContent theme={currentTheme}>
        {renderDashboardContent()}
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;

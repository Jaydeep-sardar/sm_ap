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
      radial-gradient(ellipse at bottom, rgba(255, 140, 0, 0.1) 0%, transparent 50%)
    `
    : `
      linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 15%, #d1fae5 35%, #a7f3d0 55%, #6ee7b7 75%, #ecfdf5 100%),
      radial-gradient(ellipse at top, rgba(16, 185, 129, 0.15) 0%, transparent 60%),
      radial-gradient(ellipse at bottom, rgba(5, 150, 105, 0.1) 0%, transparent 50%)
    `};
  background-attachment: fixed;
  background-size: 100% 100%, 120% 120%, 150% 150%;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
  
  /* Add sophisticated animated background patterns */
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
        linear-gradient(45deg, transparent 40%, rgba(255, 215, 0, 0.02) 50%, transparent 60%)
      `
      : `
        radial-gradient(circle at 15% 20%, rgba(16, 185, 129, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 85% 30%, rgba(5, 150, 105, 0.06) 0%, transparent 45%),
        radial-gradient(circle at 45% 70%, rgba(4, 120, 87, 0.05) 0%, transparent 35%),
        radial-gradient(circle at 75% 80%, rgba(6, 95, 70, 0.04) 0%, transparent 50%),
        radial-gradient(circle at 25% 90%, rgba(6, 78, 59, 0.03) 0%, transparent 40%),
        linear-gradient(45deg, transparent 40%, rgba(16, 185, 129, 0.02) 50%, transparent 60%)
      `};
    background-size: 300px 300px, 400px 400px, 250px 250px, 350px 350px, 280px 280px, 200px 200px;
    animation: backgroundShift 30s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
  }
  
  /* Add floating particles effect */
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
        radial-gradient(2px 2px at 160px 30px, rgba(255, 193, 7, 0.2), transparent)
      `
      : `
        radial-gradient(2px 2px at 20px 30px, rgba(16, 185, 129, 0.3), transparent),
        radial-gradient(2px 2px at 40px 70px, rgba(5, 150, 105, 0.2), transparent),
        radial-gradient(1px 1px at 90px 40px, rgba(4, 120, 87, 0.4), transparent),
        radial-gradient(1px 1px at 130px 80px, rgba(6, 95, 70, 0.3), transparent),
        radial-gradient(2px 2px at 160px 30px, rgba(6, 78, 59, 0.2), transparent)
      `};
    background-repeat: repeat;
    background-size: 200px 100px;
    animation: particleFloat 40s linear infinite;
    pointer-events: none;
    z-index: 0;
    opacity: 0.6;
  }
  
  @keyframes backgroundShift {
    0%, 100% { 
      opacity: 1; 
      transform: scale(1) rotate(0deg); 
    }
    25% { 
      opacity: 0.8; 
      transform: scale(1.05) rotate(0.5deg); 
    }
    50% { 
      opacity: 0.9; 
      transform: scale(1.1) rotate(-0.3deg); 
    }
    75% { 
      opacity: 0.7; 
      transform: scale(1.03) rotate(0.2deg); 
    }
  }
  
  @keyframes particleFloat {
    0% { transform: translateY(0px) translateX(0px); }
    33% { transform: translateY(-10px) translateX(5px); }
    66% { transform: translateY(5px) translateX(-3px); }
    100% { transform: translateY(0px) translateX(0px); }
  }
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
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
        rgba(255, 253, 245, 0.95) 0%, 
        rgba(254, 252, 232, 0.9) 20%, 
        rgba(255, 251, 235, 0.85) 40%, 
        rgba(255, 255, 255, 0.9) 60%, 
        rgba(254, 252, 232, 0.95) 80%, 
        rgba(255, 253, 245, 0.9) 100%
      ),
      radial-gradient(ellipse 800px 600px at 50% 0%, rgba(255, 215, 0, 0.08) 0%, transparent 50%),
      radial-gradient(ellipse 600px 400px at 0% 100%, rgba(255, 165, 0, 0.06) 0%, transparent 40%)
    `
    : `
      linear-gradient(135deg, 
        rgba(240, 253, 249, 0.95) 0%, 
        rgba(236, 253, 245, 0.9) 20%, 
        rgba(209, 250, 229, 0.85) 40%, 
        rgba(255, 255, 255, 0.9) 60%, 
        rgba(236, 253, 245, 0.95) 80%, 
        rgba(240, 253, 249, 0.9) 100%
      ),
      radial-gradient(ellipse 800px 600px at 50% 0%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
      radial-gradient(ellipse 600px 400px at 0% 100%, rgba(5, 150, 105, 0.06) 0%, transparent 40%)
    `};
  background-blend-mode: multiply, overlay, soft-light;
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
  backdrop-filter: blur(10px);
  scroll-behavior: smooth;
  
  /* Add sophisticated texture overlay */
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
        linear-gradient(135deg, transparent 30%, rgba(255, 140, 0, 0.03) 50%, transparent 70%),
        linear-gradient(45deg, rgba(218, 165, 32, 0.02) 25%, transparent 25%, transparent 75%, rgba(255, 193, 7, 0.02) 75%)
      `
      : `
        radial-gradient(circle at 3px 3px, rgba(16, 185, 129, 0.15) 2px, transparent 0),
        radial-gradient(circle at 15px 15px, rgba(5, 150, 105, 0.08) 1px, transparent 0),
        linear-gradient(135deg, transparent 30%, rgba(4, 120, 87, 0.03) 50%, transparent 70%),
        linear-gradient(45deg, rgba(6, 95, 70, 0.02) 25%, transparent 25%, transparent 75%, rgba(6, 78, 59, 0.02) 75%)
      `};
    background-size: 25px 25px, 30px 30px, 300px 300px, 50px 50px;
    animation: textureFloat 35s linear infinite;
    pointer-events: none;
    z-index: -1;
    opacity: 0.7;
  }
  
  /* Add glass morphism effect */
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
          rgba(255, 255, 255, 0.1) 0%, 
          rgba(255, 252, 235, 0.05) 25%, 
          rgba(255, 255, 255, 0.08) 50%, 
          rgba(254, 250, 224, 0.06) 75%, 
          rgba(255, 255, 255, 0.1) 100%
        )
      `
      : `
        linear-gradient(135deg, 
          rgba(255, 255, 255, 0.1) 0%, 
          rgba(240, 253, 249, 0.05) 25%, 
          rgba(255, 255, 255, 0.08) 50%, 
          rgba(236, 253, 245, 0.06) 75%, 
          rgba(255, 255, 255, 0.1) 100%
        )
      `};
    backdrop-filter: blur(2px);
    border-radius: 0;
    pointer-events: none;
    z-index: -1;
  }
  
  @keyframes textureFloat {
    0% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(-2px, -3px) rotate(0.5deg); }
    50% { transform: translate(3px, -2px) rotate(-0.3deg); }
    75% { transform: translate(-1px, 2px) rotate(0.2deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
  }
  
  /* Enhanced responsive scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme === 'golden' 
      ? 'linear-gradient(180deg, rgba(255, 215, 0, 0.08) 0%, rgba(255, 165, 0, 0.04) 100%)' 
      : 'linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.04) 100%)'};
    border-radius: 4px;
    border: ${props => props.theme === 'golden' 
      ? '1px solid rgba(255, 215, 0, 0.1)' 
      : '1px solid rgba(16, 185, 129, 0.1)'};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme === 'golden' 
      ? 'linear-gradient(180deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)' 
      : 'linear-gradient(180deg, #10B981 0%, #059669 50%, #047857 100%)'};
    border-radius: 4px;
    border: ${props => props.theme === 'golden' 
      ? '1px solid rgba(255, 215, 0, 0.2)' 
      : '1px solid rgba(16, 185, 129, 0.2)'};
    box-shadow: ${props => props.theme === 'golden' 
      ? '0 2px 6px rgba(255, 165, 0, 0.2)' 
      : '0 2px 6px rgba(16, 185, 129, 0.2)'};
    transition: all 0.3s ease;
    
    &:hover {
      background: ${props => props.theme === 'golden' 
        ? 'linear-gradient(180deg, #FFED4E 0%, #FFB800 50%, #FF7F00 100%)' 
        : 'linear-gradient(180deg, #34D399 0%, #10B981 50%, #065F46 100%)'};
      box-shadow: ${props => props.theme === 'golden' 
        ? '0 4px 10px rgba(255, 165, 0, 0.3)' 
        : '0 4px 10px rgba(16, 185, 129, 0.3)'};
    }
  }
  
  /* Mobile responsive adjustments */
  @media (max-width: 767px) {
    padding: 12px;
    margin-top: 65px;
    
    &::-webkit-scrollbar {
      width: 4px;
    }
  }
  
  @media (min-width: 768px) {
    padding: 25px;
    margin-left: 260px;
    margin-top: 0;
    min-height: 100vh;
    
    &::-webkit-scrollbar {
      width: 10px;
    }
  }
  
  @media (min-width: 1024px) {
    padding: 30px;
  }
  
  @media (min-width: 1200px) {
    padding: 35px;
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
        rgba(255, 253, 245, 0.98) 0%, 
        rgba(254, 252, 232, 0.95) 20%, 
        rgba(255, 255, 255, 0.92) 40%, 
        rgba(254, 250, 224, 0.95) 60%, 
        rgba(255, 252, 235, 0.98) 80%, 
        rgba(255, 253, 245, 0.95) 100%
      )
    `
    : `
      linear-gradient(135deg, 
        rgba(240, 253, 249, 0.98) 0%, 
        rgba(236, 253, 245, 0.95) 20%, 
        rgba(255, 255, 255, 0.92) 40%, 
        rgba(209, 250, 229, 0.95) 60%, 
        rgba(167, 243, 208, 0.98) 80%, 
        rgba(240, 253, 249, 0.95) 100%
      )
    `};
  border-radius: 24px;
  box-shadow: ${props => props.theme === 'golden' 
    ? `
      0 8px 32px rgba(255, 165, 0, 0.12), 
      0 0 40px rgba(255, 215, 0, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      inset 0 -1px 0 rgba(255, 215, 0, 0.1)
    ` 
    : `
      0 8px 32px rgba(16, 185, 129, 0.12), 
      0 0 40px rgba(5, 150, 105, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      inset 0 -1px 0 rgba(16, 185, 129, 0.1)
    `};
  padding: 32px;
  border: ${props => props.theme === 'golden' 
    ? '2px solid rgba(255, 215, 0, 0.2)' 
    : '2px solid rgba(16, 185, 129, 0.2)'};
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(25px);
  
  /* Elegant top accent with gradient */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: ${props => props.theme === 'golden' 
      ? 'linear-gradient(90deg, #FFD700 0%, #FFA500 25%, #FF8C00 50%, #DAA520 75%, #FFD700 100%)' 
      : 'linear-gradient(90deg, #10B981 0%, #059669 25%, #047857 50%, #065f46 75%, #10B981 100%)'};
    background-size: 200% 100%;
    border-radius: 24px 24px 0 0;
    animation: gradientShift 3s ease-in-out infinite;
  }
  
  /* Sophisticated pattern overlay */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme === 'golden' 
      ? `
        radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.05) 0%, transparent 30%),
        radial-gradient(circle at 80% 80%, rgba(255, 165, 0, 0.04) 0%, transparent 35%),
        radial-gradient(circle at 40% 60%, rgba(218, 165, 32, 0.03) 0%, transparent 25%),
        linear-gradient(135deg, transparent 40%, rgba(255, 193, 7, 0.02) 50%, transparent 60%)
      `
      : `
        radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.05) 0%, transparent 30%),
        radial-gradient(circle at 80% 80%, rgba(5, 150, 105, 0.04) 0%, transparent 35%),
        radial-gradient(circle at 40% 60%, rgba(4, 120, 87, 0.03) 0%, transparent 25%),
        linear-gradient(135deg, transparent 40%, rgba(6, 78, 59, 0.02) 50%, transparent 60%)
      `};
    border-radius: 24px;
    pointer-events: none;
  }
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: ${props => props.theme === 'golden' 
      ? `
        0 20px 60px rgba(255, 165, 0, 0.18), 
        0 0 80px rgba(255, 215, 0, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.3),
        inset 0 -1px 0 rgba(255, 215, 0, 0.15)
      ` 
      : `
        0 20px 60px rgba(16, 185, 129, 0.18), 
        0 0 80px rgba(5, 150, 105, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.3),
        inset 0 -1px 0 rgba(16, 185, 129, 0.15)
      `};
    border-color: ${props => props.theme === 'golden' 
      ? 'rgba(255, 215, 0, 0.4)' 
      : 'rgba(16, 185, 129, 0.4)'};
    
    &::before {
      height: 7px;
      animation-duration: 2s;
    }
  }
  
  h3 {
    color: ${props => props.theme === 'golden' 
      ? '#B8860B' 
      : '#064e3b'};
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 14px;
    position: relative;
    z-index: 1;
    
    svg {
      color: ${props => props.theme === 'golden' 
        ? '#DAA520' 
        : '#10B981'};
      padding: 10px;
      background: ${props => props.theme === 'golden' 
        ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 165, 0, 0.1) 100%)' 
        : 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%)'};
      border-radius: 12px;
      font-size: 22px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: ${props => props.theme === 'golden' 
        ? '1px solid rgba(255, 215, 0, 0.2)' 
        : '1px solid rgba(16, 185, 129, 0.2)'};
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
  }
  
  &:hover h3 svg {
    background: ${props => props.theme === 'golden' 
      ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.25) 0%, rgba(255, 140, 0, 0.2) 100%)' 
      : 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.2) 100%)'};
    color: ${props => props.theme === 'golden' 
      ? '#FF8C00' 
      : '#047857'};
    transform: scale(1.1) rotate(5deg);
    box-shadow: ${props => props.theme === 'golden' 
      ? '0 4px 12px rgba(255, 165, 0, 0.3)' 
      : '0 4px 12px rgba(16, 185, 129, 0.3)'};
  }
  
  @media (min-width: 768px) {
    padding: 30px;
    
    h3 {
      font-size: 20px;
      margin-bottom: 16px;
      gap: 12px;
    }
    
    p {
      font-size: 15px;
    }
  }
  
  @media (min-width: 992px) {
    padding: 34px;
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

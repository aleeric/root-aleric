import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  min-height: calc(100vh - var(--topbar-height) - var(--rightmenu-width));
  
  @media (max-width: 768px) {
    min-height: calc(100vh - var(--mobile-menu-height));
  }
`;

const LoadingText = styled.div`
  color: var(--kali-blue);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  animation: ${pulse} 1.5s infinite;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid var(--kali-terminal-border);
  border-top: 3px solid var(--kali-blue);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingScreen: React.FC = () => {
  return (
    <Container>
      <LoadingText>Loading...</LoadingText>
      <Spinner />
    </Container>
  );
};

export default LoadingScreen; 
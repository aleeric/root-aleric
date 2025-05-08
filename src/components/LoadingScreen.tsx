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

const glitch = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

const scanline = keyframes`
  0% { top: 0; }
  100% { top: 100%; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  min-height: calc(100vh - var(--topbar-height) - var(--rightmenu-width));
  background: linear-gradient(135deg, #0a0a0a 80%, #1a1a1a 100%);
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    min-height: calc(100vh - var(--mobile-menu-height));
  }
`;

const LoadingText = styled.div`
  color: var(--kali-blue);
  font-size: 1.7rem;
  margin-bottom: 1.2rem;
  animation: ${glitch} 1.2s infinite alternate, ${pulse} 1.5s infinite;
  letter-spacing: 2px;
  text-shadow: 0 0 10px #00ff9d, 0 0 20px #0ff;
`;

const SpinnerWrapper = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid var(--kali-terminal-border);
  border-top: 4px solid var(--kali-blue);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  box-shadow: 0 0 24px #00ff9d, 0 0 8px #0ff;
`;

const Scanline = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 3px;
  width: 100%;
  background: linear-gradient(90deg, transparent, #00ff9d88 50%, transparent);
  opacity: 0.7;
  animation: ${scanline} 1.8s linear infinite;
  z-index: 2;
`;

const LoadingScreen: React.FC = () => {
  return (
    <Container>
      <LoadingText>Loading the cyberverse...</LoadingText>
      <SpinnerWrapper>
        <Spinner />
        <Scanline />
      </SpinnerWrapper>
    </Container>
  );
};

export default LoadingScreen; 
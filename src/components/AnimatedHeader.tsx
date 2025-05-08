import React from 'react';
import styled, { keyframes } from 'styled-components';

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

const HeaderContainer = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, var(--kali-terminal-bg) 0%, rgba(31, 31, 31, 0.8) 100%);
  position: relative;
  overflow: hidden;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--kali-blue);
  box-shadow: 0 0 20px rgba(114, 159, 207, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--kali-blue), transparent);
    animation: ${glitch} 2s infinite;
    z-index: 2;
  }

  /* Scanline overlay */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    width: 100%;
    background: linear-gradient(90deg, transparent, #00ff9d88 50%, transparent);
    opacity: 0.5;
    animation: ${scanline} 3.5s linear infinite;
    z-index: 3;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: var(--kali-blue);
  letter-spacing: 4px;
  margin: 0;
  text-shadow: 0 0 10px #00ff9d, 0 0 20px #0ff, 0 0 40px #0ff;
  animation: ${glitch} 2.5s infinite alternate;
  position: relative;
  z-index: 4;

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
  }

  &::before {
    left: 2px;
    text-shadow: -2px 0 var(--kali-green);
    animation: ${glitch} 1.5s infinite;
    color: var(--kali-green);
  }

  &::after {
    left: -2px;
    text-shadow: 2px 0 var(--kali-red);
    animation: ${glitch} 1.2s infinite;
    color: var(--kali-red);
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--kali-text);
  margin-top: 1rem;
  opacity: 0.85;
  text-align: center;
  max-width: 600px;
  line-height: 1.6;
  letter-spacing: 1px;
  z-index: 4;
  animation: ${glitch} 4s infinite alternate;
`;

const AnimatedHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <Title data-text="root@aleric">root@aleric</Title>
      <Subtitle>Cloud Security Engineer @ Satispay</Subtitle>
    </HeaderContainer>
  );
};

export default AnimatedHeader; 
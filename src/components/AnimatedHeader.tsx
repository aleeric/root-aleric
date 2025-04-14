import React from 'react';
import styled, { keyframes } from 'styled-components';

const glitch = keyframes`
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
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
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--kali-blue), transparent);
    animation: ${glitch} 2s infinite;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: var(--kali-blue);

  letter-spacing: 4px;
  margin: 0;
  text-shadow: 0 0 10px rgba(114, 159, 207, 0.5);
  animation: ${glitch} 5s infinite;
  position: relative;
  z-index: 1;

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &::before {
    left: 2px;
    text-shadow: -2px 0 var(--kali-green);
    animation: ${glitch} 2s infinite;
  }

  &::after {
    left: -2px;
    text-shadow: 2px 0 var(--kali-red);
    animation: ${glitch} 3s infinite;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--kali-text);
  margin-top: 1rem;
  opacity: 0.8;
  text-align: center;
  max-width: 600px;
  line-height: 1.6;
`;

const AnimatedHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <Title data-text="root@aleric">root@aleric</Title>
      <Subtitle>Cloud Security Engineer</Subtitle>
    </HeaderContainer>
  );
};

export default AnimatedHeader; 
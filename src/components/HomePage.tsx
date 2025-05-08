import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import Terminal from './Terminal'
import { useNavigate } from 'react-router-dom'
import AnimatedHeader from './AnimatedHeader'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glowPulse = keyframes`
  0% { box-shadow: 0 0 5px var(--kali-blue); }
  50% { box-shadow: 0 0 20px var(--kali-blue); }
  100% { box-shadow: 0 0 5px var(--kali-blue); }
`;

const scanline = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const typewriter = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blink = keyframes`
  0%, 100% { border-color: var(--kali-blue); }
  50% { border-color: transparent; }
`;

const HomeContainer = styled.div`
  min-height: calc(100vh - var(--topbar-height));
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: relative;

  @media (max-width: 768px) {
    min-height: 100vh;
    padding: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.95) 100%);
  }
`

const TerminalContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`

const MenuSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  gap: 3rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--kali-blue), transparent);
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const MenuCard = styled.div`
  flex: 1;
  max-width: 400px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid var(--kali-blue);
  border-radius: 8px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--kali-blue), transparent);
    animation: ${glowPulse} 2s infinite;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px var(--kali-blue);
    background: rgba(0, 0, 0, 0.6);
  }

  h2 {
    color: var(--kali-blue);
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  p {
    color: var(--kali-text);
    margin-bottom: 1rem;
    line-height: 1.6;
    font-size: 1.1rem;
  }
`

const MobileHeader = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
    text-align: center;
    background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%);
    border-bottom: 1px solid var(--kali-blue);
    box-shadow: 0 0 20px rgba(0, 0, 255, 0.1);
    animation: ${fadeIn} 0.8s ease-out;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 255, 0.1) 50%, transparent 100%);
      animation: ${scanline} 4s linear infinite;
      pointer-events: none;
    }
  }
`

const MobileTitle = styled.h1`
  color: var(--kali-blue);
  font-size: 2rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: ${fadeIn} 0.5s ease-out, ${pulse} 3s infinite;
  text-shadow: 0 0 10px var(--kali-blue);
`

const MobileSubtitle = styled.p`
  color: var(--kali-text);
  font-size: 1.1rem;
  max-width: 600px;
  line-height: 1.6;
  animation: ${fadeIn} 0.5s ease-out 0.2s backwards;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 2px;
    background: var(--kali-blue);
    animation: ${glowPulse} 2s infinite;
  }
`

const MobileMenuSection = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem 1rem;
    max-width: 600px;
    margin: 0 auto;
    width: 100%;
    animation: ${fadeIn} 0.8s ease-out 0.3s backwards;
  }
`

const MobileMenuCard = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid var(--kali-blue);
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(.4,2,.3,1);
  position: relative;
  overflow: hidden;
  animation: ${slideIn} 0.7s cubic-bezier(.4,2,.3,1) backwards;
  box-shadow: 0 0 0px var(--kali-blue);
  &:nth-child(1) { animation-delay: 0.4s; }
  &:nth-child(2) { animation-delay: 0.7s; }
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--kali-blue), transparent);
    animation: ${glowPulse} 2s infinite;
  }
  &:active {
    transform: scale(0.97) rotate(-1deg);
    background: rgba(0, 0, 0, 0.6);
    box-shadow: 0 0 20px var(--kali-blue);
  }
  &:hover {
    box-shadow: 0 0 25px var(--kali-blue);
    background: rgba(0, 0, 0, 0.6);
  }
  h2 {
    color: var(--kali-blue);
    font-size: 1.5rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-shadow: 0 0 5px var(--kali-blue);
    letter-spacing: 1px;
  }
  p {
    color: var(--kali-text);
    font-size: 1rem;
    line-height: 1.6;
  }
`

const ClickableOutput = styled.div`
  cursor: pointer;
  color: var(--kali-text);
  margin-left: 2rem;
  padding: 0.5rem 0;
  
  &:hover {
    color: var(--kali-blue);
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    margin-left: 1rem;
    padding: 0.75rem 0;
  }
`

interface ClickableItem {
  text: string;
  path: string;
}

interface CommandHistoryItem {
  command: string;
  output: (string | ClickableItem)[];
  showPrompt?: boolean;
}

const Typewriter = styled.span`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid var(--kali-blue);
  width: 0;
  animation: ${typewriter} 2s steps(20, end) 0.2s forwards, ${blink} 1s step-end infinite 2.2s;
`;

const AnimatedIcon = styled.span`
  display: inline-block;
  font-size: 1.7rem;
  margin-right: 0.7rem;
  animation: iconBounce 2s infinite;
  @keyframes iconBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px) scale(1.1); }
  }
`;

const ParallaxLines = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  pointer-events: none;
  z-index: 0;
  @media (min-width: 769px) { display: none; }
  & > div {
    position: absolute;
    width: 100vw;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--kali-blue), transparent);
    opacity: 0.08;
    animation: parallaxMove 10s linear infinite;
  }
  & > div:nth-child(1) { top: 20%; animation-delay: 0s; }
  & > div:nth-child(2) { top: 40%; animation-delay: 2s; }
  & > div:nth-child(3) { top: 60%; animation-delay: 4s; }
  & > div:nth-child(4) { top: 80%; animation-delay: 6s; }
  @keyframes parallaxMove {
    0% { transform: translateX(-10vw); }
    100% { transform: translateX(10vw); }
  }
`;

const CRTOverlay = styled.div`
  pointer-events: none;
  position: fixed;
  z-index: 10;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: repeating-linear-gradient(
    to bottom,
    rgba(114,159,207,0.04) 0px,
    rgba(114,159,207,0.04) 1px,
    transparent 1px,
    transparent 4px
  );
  mix-blend-mode: lighten;
  @media (min-width: 769px) { display: none; }
`;

const DesktopParallaxLines = styled(ParallaxLines)`
  @media (max-width: 768px) { display: none; }
  z-index: 1;
`;

const DesktopCRTOverlay = styled(CRTOverlay)`
  @media (max-width: 768px) { display: none; }
  z-index: 2;
`;

const DesktopMenuCard = styled(MenuCard)`
  animation: ${slideIn} 0.7s cubic-bezier(.4,2,.3,1) backwards;
  box-shadow: 0 0 0px var(--kali-blue);
  &:nth-child(1) { animation-delay: 0.4s; }
  &:nth-child(2) { animation-delay: 0.7s; }
  &:active {
    transform: scale(0.97) rotate(-1deg);
    background: rgba(0, 0, 0, 0.6);
    box-shadow: 0 0 20px var(--kali-blue);
  }
  &:hover {
    box-shadow: 0 0 25px var(--kali-blue);
    background: rgba(0, 0, 0, 0.6);
  }
  h2 {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    font-size: 1.8rem;
    letter-spacing: 2px;
  }
`;

const HomePage = () => {
  const navigate = useNavigate()
  const [commandHistory, setCommandHistory] = useState<CommandHistoryItem[]>([])

  const welcomeMessage = [
    '~ $ whoami',
    'Riccardo Alesci',
    ' ',
    '',
    'Type "help" for available commands.'
  ]

  const availableCommands = {
    help: [
      'Available commands:',
      '',
      'help     - Show this help message',
      'about    - Display about information',
      'articles - List articles',
      'clear    - Clear terminal',
      'contact  - Show contact information'
    ],
    about: [
      'Cloud Security Engineer at Satispay',
      ' ',
      'Combining hands-on experience in SIEM, threat detection,',
      'and compliance. I help organizations secure',
      'their infrastructure—cloud and on-prem—through automation,', 
      'proactive monitoring, and collaborative security practices.',
      { text: '--> See Career <--', path: '/career' }
    ],
    contact: [
      'Contact Information:',
      '',
      'Email:    alesci.riccardo1@gmail.com',
      'LinkedIn: https://www.linkedin.com/in/riccardo-alesci/',
      'GitHub:   https://github.com/aleeric'
    ],
    articles: ['Recent Articles:', '']
  }

  const recentArticles: ClickableItem[] = [
    { text: '--> 1. Splunk RCE Vulnerability <---', path: '/articles/splunk-rce' }
  ]

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim()
    let output: (string | ClickableItem)[] = []

    switch (command) {
      case 'help':
        output = availableCommands.help
        break
      case 'about':
        output = availableCommands.about
        break
      case 'contact':
        output = availableCommands.contact
        break
      case 'articles':
        output = [...availableCommands.articles, ...recentArticles]
        break
      case 'clear':
        setCommandHistory([])
        return
      default:
        output = [`Command not found: ${command}`, 'Type "help" for available commands.']
    }

    setCommandHistory(prev => [...prev, { command: cmd, output }])
  }

  const renderOutput = (line: string | ClickableItem, index: number) => {
    if (typeof line === 'string') {
      return <span key={index} style={{ color: 'var(--kali-text)', whiteSpace: 'pre' }}>{line}</span>
    }
    return (
      <ClickableOutput key={index} onClick={() => navigate(line.path)}>
        {line.text}
      </ClickableOutput>
    )
  }

  const initialCommands: CommandHistoryItem[] = [
    { 
      command: '', 
      output: welcomeMessage, 
      showPrompt: false 
    }
  ]

  return (
    <HomeContainer>
      <div className="desktop-only">
        <AnimatedHeader />
      </div>
      <TerminalContainer>
        <Terminal
          title="root@aleric"
          path="~"
          commands={[...initialCommands, ...commandHistory]}
          onCommand={handleCommand}
          renderOutput={renderOutput}
        />
      </TerminalContainer>
      <MenuSection>
        <DesktopParallaxLines>
          <div></div><div></div><div></div><div></div>
        </DesktopParallaxLines>
        <DesktopCRTOverlay />
        <DesktopMenuCard onClick={() => navigate('/career')}>
          <h2><AnimatedIcon role="img" aria-label="Career">💼</AnimatedIcon>Career</h2>
          <p>Explore my professional journey, skills, and experience in cloud security and cybersecurity.</p>
        </DesktopMenuCard>
        <DesktopMenuCard onClick={() => navigate('/articles')}>
          <h2><AnimatedIcon role="img" aria-label="Articles">📚</AnimatedIcon>Articles</h2>
          <p>Read my latest articles about cybersecurity, cloud security, and technical insights.</p>
        </DesktopMenuCard>
      </MenuSection>
      <MobileHeader>
        <MobileTitle>
          <Typewriter>root@aleric</Typewriter>
        </MobileTitle>
        <MobileSubtitle>
          Cloud Security Engineer @ Satispay
        </MobileSubtitle>
      </MobileHeader>
      <MobileMenuSection>
        <MobileMenuCard onClick={() => navigate('/career')}>
          <h2><AnimatedIcon role="img" aria-label="Career">💼</AnimatedIcon>Career</h2>
          <p>Explore my professional journey, skills, and experience in cloud security and cybersecurity.</p>
        </MobileMenuCard>
        <MobileMenuCard onClick={() => navigate('/articles')}>
          <h2><AnimatedIcon role="img" aria-label="Articles">📚</AnimatedIcon>Articles</h2>
          <p>Read my latest articles about cybersecurity, cloud security, and technical insights.</p>
        </MobileMenuCard>
      </MobileMenuSection>
    </HomeContainer>
  )
}

export default HomePage 
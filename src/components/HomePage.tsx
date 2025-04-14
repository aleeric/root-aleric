import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import Terminal from './Terminal'
import { useNavigate } from 'react-router-dom'
import MobileCommandInput from './MobileCommandInput'
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

const HomeContainer = styled.div`
  min-height: calc(100vh - var(--topbar-height));
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: relative;

  @media (max-width: 768px) {
    min-height: 100vh;
    padding: 0;
    padding-bottom: 120px; /* Space for mobile command input */
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
    height: 100%;
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
      <div className="mobile-only">
        <MobileCommandInput onExecuteCommand={handleCommand} />
      </div>
    </HomeContainer>
  )
}

export default HomePage 
import React, { useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

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

const TerminalContainer = styled.div`
  background: var(--kali-terminal-bg);
  border: 1px solid var(--kali-terminal-border);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    border: none;
    border-radius: 0;
  }
`;

const GlitchScanline = styled.div`
  display: none;
  @media (min-width: 769px) {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    width: 100%;
    background: linear-gradient(90deg, transparent, #00ff9d88 50%, transparent);
    opacity: 0.5;
    animation: ${scanline} 2.5s linear infinite;
    z-index: 3;
    pointer-events: none;
  }
`;

const TerminalHeader = styled.div`
  background: var(--kali-terminal-header);
  padding: 8px;
  border-bottom: 1px solid var(--kali-terminal-border);
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
  animation: ${glitch} 2.5s infinite alternate;

  @media (max-width: 768px) {
    padding: 6px;
    animation: none;
  }
`;

const TerminalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  font-family: 'Share Tech Mono', monospace;
  position: relative;

  @media (max-width: 768px) {
    padding: 0.5rem;
    -webkit-overflow-scrolling: touch;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--kali-terminal-bg);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--kali-terminal-border);
    border-radius: 4px;
  }
`;

const TerminalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CommandLine = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Prompt = styled.span`
  color: var(--kali-blue);
  white-space: nowrap;
  animation: ${glitch} 2.2s infinite alternate;
`;

const Command = styled.span`
  color: var(--kali-text);
`;

const OutputContainer = styled.div`
  margin-left: 1rem;
  color: var(--kali-text);
  white-space: pre-wrap;
  word-break: break-word;

  @media (max-width: 768px) {
    margin-left: 0.5rem;
    font-size: 14px;
  }
`;

const Title = styled.div`
  color: var(--kali-text);
  font-size: 14px;
  font-family: 'Share Tech Mono', monospace;
  text-shadow: 0 0 8px #00ff9d, 0 0 16px #0ff;
`;

const CommandInput = styled.input`
  background: transparent;
  border: none;
  color: var(--kali-text);
  font-family: 'Share Tech Mono', monospace;
  font-size: 14px;
  outline: none;
  width: 100%;
  padding: 0;
  transition: box-shadow 0.2s;
  box-shadow: none;
  @media (min-width: 769px) {
    &:focus {
      box-shadow: 0 0 8px #00ff9d, 0 0 16px #0ff;
      border-radius: 2px;
    }
  }
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

interface ClickableItem {
  text: string;
  path: string;
}

type OutputLine = string | ClickableItem;

interface TerminalProps {
  title: string;
  path: string;
  commands: Array<{ command: string; output: OutputLine[] }>;
  onCommand: (command: string) => void;
  renderOutput?: (line: OutputLine, index: number) => React.ReactNode;
}

const Terminal: React.FC<TerminalProps> = ({ title, path, commands, onCommand, renderOutput }) => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentCommand.trim()) {
      onCommand(currentCommand.trim());
      setCommandHistory(prev => [...prev, currentCommand.trim()]);
      setCurrentCommand('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  const defaultRenderOutput = (line: OutputLine, index: number) => {
    if (typeof line === 'string') {
      return <span key={index} style={{ color: 'var(--kali-text)', whiteSpace: 'pre' }}>{line}</span>;
    }
    return (
      <span key={index} style={{ color: 'var(--kali-blue)', cursor: 'pointer' }}>
        {line.text}
      </span>
    );
  };

  const renderLine = renderOutput || defaultRenderOutput;

  return (
    <TerminalContainer>
      <GlitchScanline />
      <TerminalHeader>
        <Title>{title}</Title>
      </TerminalHeader>
      <TerminalBody>
        <TerminalContent>
          {commands.map((cmd, cmdIndex) => (
            <div key={cmdIndex}>
              {cmd.command && (
                <CommandLine>
                  <Prompt>{path} $</Prompt>
                  <Command>{cmd.command}</Command>
                </CommandLine>
              )}
              <OutputContainer>
                {cmd.output.map((line, lineIndex) => (
                  <div key={`${cmdIndex}-${lineIndex}`}>
                    {renderLine(line, lineIndex)}
                  </div>
                ))}
              </OutputContainer>
            </div>
          ))}
        </TerminalContent>
        <div className="terminal-input">
          <CommandLine>
            <Prompt>{path} $</Prompt>
            <CommandInput
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoFocus
            />
          </CommandLine>
        </div>
      </TerminalBody>
    </TerminalContainer>
  );
};

export default Terminal; 
import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

const TerminalContainer = styled.div`
  background: var(--kali-terminal-bg);
  border: 1px solid var(--kali-terminal-border);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    border: none;
    border-radius: 0;
  }
`

const TerminalHeader = styled.div`
  background: var(--kali-terminal-header);
  padding: 8px;
  border-bottom: 1px solid var(--kali-terminal-border);
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    padding: 6px;
  }
`

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
`

const TerminalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const CommandLine = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`

const Prompt = styled.span`
  color: var(--kali-blue);
  white-space: nowrap;
`

const Command = styled.span`
  color: var(--kali-text);
`

const OutputContainer = styled.div`
  margin-left: 1rem;
  color: var(--kali-text);
  white-space: pre-wrap;
  word-break: break-word;

  @media (max-width: 768px) {
    margin-left: 0.5rem;
    font-size: 14px;
  }
`

const Title = styled.div`
  color: var(--kali-text);
  font-size: 14px;
  font-family: 'Share Tech Mono', monospace;
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
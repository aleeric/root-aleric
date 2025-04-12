import React from 'react';
import styled from 'styled-components';

const MobileInputContainer = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--kali-terminal-bg);
    border-top: 1px solid var(--kali-terminal-border);
    padding: 12px;
    z-index: 1000;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
`;

const CommandButton = styled.button`
  flex: 1;
  background: var(--kali-terminal-bg);
  color: var(--kali-text);
  border: 1px solid var(--kali-terminal-border);
  padding: 12px;
  border-radius: 4px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 14px;
  
  &:active {
    background: var(--kali-blue);
    transform: translateY(1px);
  }
`;

interface MobileCommandInputProps {
  onExecuteCommand: (command: string) => void;
}

const MobileCommandInput: React.FC<MobileCommandInputProps> = ({ onExecuteCommand }) => {
  const [showCommands, setShowCommands] = React.useState(false);

  const handleCommandClick = (command: string) => {
    onExecuteCommand(command);
  };

  return (
    <MobileInputContainer>
      <ButtonsContainer>
        <CommandButton onClick={() => handleCommandClick('help')}>
          help
        </CommandButton>
        <CommandButton onClick={() => handleCommandClick('clear')}>
          clear
        </CommandButton>
        <CommandButton onClick={() => setShowCommands(!showCommands)}>
          {showCommands ? 'less' : 'more'}
        </CommandButton>
      </ButtonsContainer>
      {showCommands && (
        <ButtonsContainer style={{ marginTop: '8px' }}>
          <CommandButton onClick={() => handleCommandClick('about')}>
            about
          </CommandButton>
          <CommandButton onClick={() => handleCommandClick('articles')}>
            articles
          </CommandButton>
        </ButtonsContainer>
      )}
    </MobileInputContainer>
  );
};

export default MobileCommandInput; 
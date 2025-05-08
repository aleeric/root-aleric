import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const glitch = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

const flicker = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 80%, #1a1a1a 100%);
  color: #00ff9d;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Share Tech Mono', monospace;
  text-align: center;
  position: relative;
`;

const GlitchTitle = styled.h1`
  font-size: 3.5rem;
  color: #00ff9d;
  text-shadow: 0 0 10px #00ff9d, 0 0 20px #0ff, 0 0 40px #0ff;
  animation: ${glitch} 1.2s infinite alternate, ${flicker} 2s infinite;
  position: relative;
  margin-bottom: 1rem;
  letter-spacing: 2px;
`;

const MemeImg = styled.img`
  width: 320px;
  margin: 2rem 0 1rem 0;
  border-radius: 12px;
  box-shadow: 0 0 30px #00ff9d44;
  animation: ${flicker} 3s infinite;
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #fff;
  margin-bottom: 2rem;
  text-shadow: 0 0 8px #00ff9d99;
`;

const TerminalFake = styled.div`
  background: #111;
  color: #0f0;
  font-size: 1.1rem;
  border: 2px solid #00ff9d;
  border-radius: 8px;
  padding: 1.2rem 2rem;
  margin: 2rem auto 0 auto;
  max-width: 480px;
  box-shadow: 0 0 20px #00ff9d33;
  font-family: 'Share Tech Mono', monospace;
  text-align: left;
  animation: ${flicker} 2.5s infinite;
`;

const EasterEgg = styled.div`
  margin-top: 2rem;
  color: #ff0055;
  font-size: 1.1rem;
  font-family: 'Share Tech Mono', monospace;
  text-shadow: 0 0 8px #ff0055aa;
`;

const tips = [
  "Tip: Real hackers are not hackers.",
  "Hint: The flag is not under your keyboard.",
  "Pro move: Try not to copy-paste everything.",
  "Did you try turning it off and on again?",
  "Remember: Google is your friend, but not your savior.",
  "If you can read this, you're already better than a script kiddie!"
];

const AntiScriptKid: React.FC = () => {
  const [terminalLines, setTerminalLines] = useState<string[]>([
    'root@aleric:~$ npm run hack',
    '[ACCESS DENIED] - Nice try, scriptkid.',
    'root@aleric:~$ sudo unlock',
    '[ERROR] You must be at least level 9000 to use this command.',
    'root@aleric:~$ help',
    'Try reading the README.md, if you dare...'
  ]);
  const [input, setInput] = useState('');
  const [easterEgg, setEasterEgg] = useState('');

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      let response = '';
      if (input.trim().toLowerCase() === 'unlock') {
        response = '[FAIL] Unlocking... Just kidding. Still locked.';
      } else if (input.trim().toLowerCase() === 'leet') {
        response = 'You are now 1337. But still locked out.';
      } else if (input.trim().toLowerCase() === 'sudo su') {
        response = 'Permission denied. This isn\'t your box.';
      } else {
        response = `Command not found: ${input}`;
      }
      setTerminalLines([...terminalLines, `root@aleric:~$ ${input}`, response]);
      setInput('');
      if (input.trim().toLowerCase() === 'flag') {
        setEasterEgg('No flags here. This isn\'t a CTF... or is it?');
      }
    }
  };

  return (
    <Container>
      <GlitchTitle>🚨 Scriptkid Detected 🚨</GlitchTitle>
      <MemeImg src="https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif" alt="Hacker Meme" />
      <Subtitle>
        Oops! Looks like you missed a crucial step.<br />
        This site is protected against script kiddies and lazy copypasters.<br />
        <span style={{ color: '#ff0055', fontWeight: 'bold' }}>#NoScriptKidZone</span>
      </Subtitle>
      <TerminalFake>
        {terminalLines.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
          <span style={{ color: '#00ff9d', marginRight: 4 }}>root@aleric:~$</span>
          <input
            style={{
              background: 'transparent',
              border: 'none',
              color: '#0f0',
              outline: 'none',
              fontFamily: 'inherit',
              fontSize: '1.1rem',
              width: 180
            }}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleInput}
            placeholder="type a command..."
            autoFocus
          />
        </div>
      </TerminalFake>
      <EasterEgg>{easterEgg}</EasterEgg>
      <div style={{ marginTop: '2.5rem', color: '#fff', opacity: 0.7, fontSize: '1.05rem' }}>
        <strong>{tips[Math.floor(Math.random() * tips.length)]}</strong>
      </div>
      <div style={{ marginTop: '1.5rem', color: '#888', fontSize: '0.95rem' }}>
        <em>"If you know, you know. If you don't, you copy-paste."</em>
      </div>
    </Container>
  );
};

export default AntiScriptKid; 
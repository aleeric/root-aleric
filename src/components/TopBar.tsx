import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const TopBarContainer = styled.div`
  background: var(--kali-terminal-header);
  border-bottom: 1px solid var(--kali-terminal-border);
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--topbar-height);
  font-family: 'Share Tech Mono', monospace;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SystemInfo = styled.div`
  color: var(--kali-text);
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;

  &:before {
    content: '';
    width: 8px;
    height: 8px;
    background: var(--kali-blue);
    border-radius: 50%;
    animation: ${blink} 2s infinite;
  }
`;

const Metric = styled.span<{ alert?: boolean }>`
  color: ${props => props.alert ? '#ff5555' : 'var(--kali-text)'};
  animation: ${props => props.alert ? pulse + ' 2s infinite' : 'none'};
`;

const TopBar = () => {
  const [systemInfo, setSystemInfo] = useState({
    cpu: '1.25%',
    memory: '2.4GB/16GB',
    disk: '45%',
    network: '↑2.1 MB/s ↓1.8 MB/s',
    uptime: new Date().toLocaleTimeString(),
    ip: '192.168.1.100'
  });

  const updateSystemInfo = useCallback(() => {
    const cpu = (Math.random() * 4 + 1).toFixed(2) + '%';
    const memory = (Math.random() * 2 + 1).toFixed(1) + 'GB/16GB';
    const network = '↑' + (Math.random() * 2).toFixed(1) + ' MB/s ↓' + (Math.random() * 1.5).toFixed(1) + ' MB/s';
    
    setSystemInfo(prev => ({
      ...prev,
      cpu,
      memory,
      network,
      uptime: new Date().toLocaleTimeString()
    }));
  }, []);

  useEffect(() => {
    if (!window.matchMedia('(max-width: 768px)').matches) {
      const interval = setInterval(updateSystemInfo, 3000);
      return () => clearInterval(interval);
    }
  }, [updateSystemInfo]);

  const isCpuHigh = parseFloat(systemInfo.cpu) > 5;
  const isMemoryHigh = parseFloat(systemInfo.memory) > 3;

  return (
    <TopBarContainer>
      <Section>
        <SystemInfo>1: Terminal</SystemInfo>
      </Section>
      <Section>
        <SystemInfo>
          CPU: <Metric alert={isCpuHigh}>{systemInfo.cpu}</Metric>
        </SystemInfo>
        <SystemInfo>
          MEM: <Metric alert={isMemoryHigh}>{systemInfo.memory}</Metric>
        </SystemInfo>
        <SystemInfo>
          DISK: <Metric>{systemInfo.disk}</Metric>
        </SystemInfo>
        <SystemInfo>
          NET: <Metric>{systemInfo.network}</Metric>
        </SystemInfo>
        <SystemInfo>
          IP: <Metric>{systemInfo.ip}</Metric>
        </SystemInfo>
        <SystemInfo>
          {systemInfo.uptime}
        </SystemInfo>
      </Section>
    </TopBarContainer>
  );
};

export default TopBar; 
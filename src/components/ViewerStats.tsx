import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import logger from '../utils/logger';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const glowPulse = keyframes`
  0% { box-shadow: 0 0 5px rgba(0, 255, 0, 0.5); }
  50% { box-shadow: 0 0 20px rgba(0, 255, 0, 0.8); }
  100% { box-shadow: 0 0 5px rgba(0, 255, 0, 0.5); }
`;

// Styled Components
const Container = styled.div`
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  border: 1px solid #00ff00;
  border-radius: 5px;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  animation: ${fadeIn} 0.5s ease-in-out;
  margin: 20px 0;
`;

const Title = styled.h2`
  margin-top: 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: ${glowPulse} 2s infinite;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

const StatCard = styled.div`
  background-color: rgba(0, 20, 0, 0.5);
  border: 1px solid #00ff00;
  border-radius: 3px;
  padding: 10px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 5px 0;
`;

const StatLabel = styled.div`
  font-size: 14px;
  opacity: 0.8;
`;

const LogEntry = styled.div`
  margin: 5px 0;
  padding: 5px;
  border-left: 2px solid #00ff00;
  font-size: 12px;
  opacity: 0.8;
`;

const LogContainer = styled.div`
  margin-top: 20px;
  max-height: 200px;
  overflow-y: auto;
  background-color: rgba(0, 10, 0, 0.3);
  padding: 10px;
  border-radius: 3px;
`;

interface ViewerStats {
  totalViews: number;
  uniqueDevices: Record<string, number>;
  uniqueSources: Record<string, number>;
  recentViews: string[];
}

const ViewerStats: React.FC = () => {
  const [stats, setStats] = useState<ViewerStats>({
    totalViews: 0,
    uniqueDevices: {},
    uniqueSources: {},
    recentViews: []
  });

  useEffect(() => {
    // Log current viewer
    const viewerInfo = logger.getViewerInfo();
    logger.logViewer(viewerInfo);

    // In a real application, you would fetch this data from a server
    // For now, we'll simulate some data
    setStats({
      totalViews: 42,
      uniqueDevices: {
        'Desktop': 25,
        'Mobile': 12,
        'Tablet': 5
      },
      uniqueSources: {
        'Direct': 20,
        'Google': 15,
        'LinkedIn': 7
      },
      recentViews: [
        '[2023-06-15T10:30:00Z] /articles | Device: Desktop | Resolution: 1920x1080 | Source: Google',
        '[2023-06-15T09:15:00Z] /projects | Device: Mobile | Resolution: 375x812 | Source: Direct',
        '[2023-06-15T08:45:00Z] /career | Device: Desktop | Resolution: 2560x1440 | Source: LinkedIn'
      ]
    });
  }, []);

  return (
    <Container>
      <Title>Viewer Statistics</Title>
      <StatsGrid>
        <StatCard>
          <StatValue>{stats.totalViews}</StatValue>
          <StatLabel>Total Views</StatLabel>
        </StatCard>
        {Object.entries(stats.uniqueDevices).map(([device, count]) => (
          <StatCard key={device}>
            <StatValue>{count}</StatValue>
            <StatLabel>{device} Views</StatLabel>
          </StatCard>
        ))}
        {Object.entries(stats.uniqueSources).map(([source, count]) => (
          <StatCard key={source}>
            <StatValue>{count}</StatValue>
            <StatLabel>{source} Traffic</StatLabel>
          </StatCard>
        ))}
      </StatsGrid>
      <LogContainer>
        <h3>Recent Views</h3>
        {stats.recentViews.map((entry, index) => (
          <LogEntry key={index}>{entry}</LogEntry>
        ))}
      </LogContainer>
    </Container>
  );
};

export default ViewerStats; 
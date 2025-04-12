import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLogging } from '../context/LoggingContext';

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

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  color: var(--kali-blue);
  font-size: 2rem;
  margin: 0;
`;

const ExportButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  background: var(--kali-terminal-bg);
  border: 1px solid var(--kali-terminal-border);
  color: var(--kali-text);
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--kali-blue);
    color: var(--kali-terminal-bg);
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;
  background: var(--kali-terminal-bg);
  border: 1px solid var(--kali-terminal-border);
  border-radius: 4px;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  background: var(--kali-terminal-header);
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--kali-terminal-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h2`
  color: var(--kali-blue);
  margin: 0;
  font-size: 1.2rem;
`;

const SectionContent = styled.div`
  padding: 1rem;
  max-height: 300px;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.5rem;
  border-bottom: 1px solid var(--kali-terminal-border);
  color: var(--kali-blue);
`;

const Td = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid var(--kali-terminal-border);
`;

const Tr = styled.tr`
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const Badge = styled.span<{ type: string }>`
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  background: ${props => {
    switch (props.type) {
      case 'PAGE_VIEW':
        return 'rgba(0, 255, 0, 0.2)';
      case 'ARTICLE_VIEW':
        return 'rgba(0, 255, 255, 0.2)';
      case 'CLICK':
        return 'rgba(255, 165, 0, 0.2)';
      case 'SCROLL':
        return 'rgba(128, 128, 128, 0.2)';
      case 'FORM_INTERACTION':
        return 'rgba(255, 0, 255, 0.2)';
      case 'ERROR':
        return 'rgba(255, 0, 0, 0.2)';
      default:
        return 'rgba(128, 128, 128, 0.2)';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'PAGE_VIEW':
        return '#00ff00';
      case 'ARTICLE_VIEW':
        return '#00ffff';
      case 'CLICK':
        return '#ffa500';
      case 'SCROLL':
        return '#c0c0c0';
      case 'FORM_INTERACTION':
        return '#ff00ff';
      case 'ERROR':
        return '#ff0000';
      default:
        return '#c0c0c0';
    }
  }};
`;

const LogsDashboard: React.FC = () => {
  const { 
    getActions, 
    getLogs, 
    getAllArticleViews, 
    getSessionInfo,
    downloadLogs 
  } = useLogging();
  
  const [actions, setActions] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [articleViews, setArticleViews] = useState<Record<string, number>>({});
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  
  useEffect(() => {
    // Load data
    setActions(getActions());
    setLogs(getLogs());
    setArticleViews(getAllArticleViews());
    setSessionInfo(getSessionInfo());
  }, [getActions, getLogs, getAllArticleViews, getSessionInfo]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  const handleExport = (format: 'json' | 'csv' | 'txt') => {
    downloadLogs(format);
  };
  
  return (
    <Container>
      <Header>
        <Title>Logs Dashboard</Title>
        <ExportButtons>
          <Button onClick={() => handleExport('json')}>Export JSON</Button>
          <Button onClick={() => handleExport('csv')}>Export CSV</Button>
          <Button onClick={() => handleExport('txt')}>Export TXT</Button>
        </ExportButtons>
      </Header>
      
      {sessionInfo && (
        <Section>
          <SectionHeader>
            <SectionTitle>Session Information</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <Table>
              <tbody>
                <Tr>
                  <Td>Session ID</Td>
                  <Td>{sessionInfo.sessionId}</Td>
                </Tr>
                <Tr>
                  <Td>Start Time</Td>
                  <Td>{formatDate(sessionInfo.startTime)}</Td>
                </Tr>
                <Tr>
                  <Td>Duration</Td>
                  <Td>{Math.round(sessionInfo.duration / 1000)} seconds</Td>
                </Tr>
              </tbody>
            </Table>
          </SectionContent>
        </Section>
      )}
      
      <Section>
        <SectionHeader>
          <SectionTitle>Page Views ({logs.length})</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <Table>
            <thead>
              <Tr>
                <Th>Timestamp</Th>
                <Th>Path</Th>
                <Th>Device</Th>
                <Th>Resolution</Th>
                <Th>Source</Th>
              </Tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <Tr key={index}>
                  <Td>{formatDate(log.timestamp)}</Td>
                  <Td>{log.path}</Td>
                  <Td>{log.deviceType}</Td>
                  <Td>{log.screenResolution}</Td>
                  <Td>{log.source}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </SectionContent>
      </Section>
      
      <Section>
        <SectionHeader>
          <SectionTitle>User Actions ({actions.length})</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <Table>
            <thead>
              <Tr>
                <Th>Timestamp</Th>
                <Th>Type</Th>
                <Th>Path</Th>
                <Th>Details</Th>
              </Tr>
            </thead>
            <tbody>
              {actions.map((action, index) => (
                <Tr key={index}>
                  <Td>{formatDate(action.timestamp)}</Td>
                  <Td><Badge type={action.type}>{action.type}</Badge></Td>
                  <Td>{action.details.path || '-'}</Td>
                  <Td>
                    {action.type === 'CLICK' && (
                      <span>Element: {action.details.elementType} {action.details.elementId ? `#${action.details.elementId}` : ''}</span>
                    )}
                    {action.type === 'SCROLL' && (
                      <span>Depth: {action.details.scrollDepth}%</span>
                    )}
                    {action.type === 'ARTICLE_VIEW' && (
                      <span>Article: {action.details.articleTitle}</span>
                    )}
                    {action.type === 'FORM_INTERACTION' && (
                      <span>Form: {action.details.formId}, Field: {action.details.formField}</span>
                    )}
                    {action.type === 'ERROR' && (
                      <span>Error: {action.details.errorMessage}</span>
                    )}
                    {action.type === 'RESOURCE_LOAD' && (
                      <span>Resource: {action.details.resourceUrl} ({action.details.resourceType})</span>
                    )}
                    {action.type === 'PAGE_VIEW' && (
                      <span>Title: {action.details.title}</span>
                    )}
                    {!['CLICK', 'SCROLL', 'ARTICLE_VIEW', 'FORM_INTERACTION', 'ERROR', 'RESOURCE_LOAD', 'PAGE_VIEW'].includes(action.type) && (
                      <span>{Object.entries(action.details)
                        .filter(([key]) => key !== 'sessionId')
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(', ')}</span>
                    )}
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </SectionContent>
      </Section>
      
      <Section>
        <SectionHeader>
          <SectionTitle>Article Views</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <Table>
            <thead>
              <Tr>
                <Th>Article ID</Th>
                <Th>Views</Th>
              </Tr>
            </thead>
            <tbody>
              {Object.entries(articleViews).map(([id, count]) => (
                <Tr key={id}>
                  <Td>{id}</Td>
                  <Td>{count}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </SectionContent>
      </Section>
    </Container>
  );
};

export default LogsDashboard; 
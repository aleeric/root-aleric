import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
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

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

interface SectionProps {
  index: number;
}

interface ArticleCardProps {
  index: number;
}

interface ArticleDescriptionProps {
  index: number;
}

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
    padding-bottom: calc(var(--mobile-menu-height) + 2rem);
    min-height: calc(100vh - var(--topbar-height) - var(--mobile-menu-height));
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 2px;
    background: var(--kali-blue);
  }
`;

const Title = styled.h1`
  color: var(--kali-blue);
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const TerminalCursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 1.2em;
  background-color: var(--kali-blue);
  animation: ${blink} 1s infinite;
`;

const Subtitle = styled.p`
  color: var(--kali-text);
  font-size: 1.2rem;
  opacity: 0.8;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const ArticleCard = styled.div<ArticleCardProps>`
  background: var(--kali-terminal-bg);
  border: 1px solid var(--kali-terminal-border);
  border-radius: 8px;
  padding: 1.5rem;
  color: var(--kali-text);
  text-decoration: none;
  transition: all 0.3s ease;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: ${props => props.index * 0.2}s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
  }
`;

const ArticleTitle = styled.h2`
  color: var(--kali-blue);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const ArticleDescription = styled.p<ArticleDescriptionProps>`
  color: var(--kali-text);
  opacity: 0.8;
  margin-bottom: 1rem;
  line-height: 1.5;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: ${props => (props.index * 0.2) + 0.1}s;
`;

const ArticleMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--kali-blue);
  font-size: 0.9rem;
  margin-top: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--kali-terminal-border);
`;

const ViewCount = styled.span`
  background: rgba(0, 255, 0, 0.1);
  color: #00ff00;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

const articles = [
  {
    id: 'Splunk RCE',
    title: '⚠️ Exposing a Critical RCE Vulnerability in Splunk',
    description: 'A detailed analysis of a severe Remote Code Execution vulnerability discovered in Splunk, including the technical details of the exploit and its implications for organizations using Splunk as their SIEM solution.',
    date: '2024-01-15',
    readTime: '15 min read',
    link: '/articles/splunk-rce',
    tags: ['Vulnerability', 'RCE', 'Splunk', 'Security']
  }
];

const ArticlesSection: React.FC = () => {
  const { logAction, getArticleViews } = useLogging();

  useEffect(() => {
    // Log that the articles page was viewed
    logAction('PAGE_VIEW', {
      path: '/articles',
      title: 'Articles'
    });
  }, []);

  const handleArticleClick = (articleId: string, articleTitle: string) => {
    logAction('ARTICLE_VIEW', {
      articleId,
      articleTitle,
      path: `/articles/${articleId}`
    });
  };

  return (
    <Container>
      <Header>
        <Title>
          Articles
          <TerminalCursor />
        </Title>
        <Subtitle>Security Research & Technical Writing</Subtitle>
      </Header>
      <ArticleGrid>
        {articles.map((article, index) => (
          <Link 
            to={article.link} 
            key={article.id}
            onClick={() => handleArticleClick(article.id, article.title)}
          >
            <ArticleCard index={index}>
              <ArticleTitle>
                {article.title}
                <ViewCount>{getArticleViews(article.id)} views</ViewCount>
              </ArticleTitle>
              <ArticleDescription index={index}>{article.description}</ArticleDescription>
              <ArticleMeta>
                <span>{article.date}</span>
                <span>{article.readTime}</span>
              </ArticleMeta>
            </ArticleCard>
          </Link>
        ))}
      </ArticleGrid>
    </Container>
  );
};

export default ArticlesSection; 
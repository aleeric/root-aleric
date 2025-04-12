import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const glowPulse = keyframes`
  0% { box-shadow: 0 0 5px var(--kali-blue); }
  50% { box-shadow: 0 0 15px var(--kali-blue); }
  100% { box-shadow: 0 0 5px var(--kali-blue); }
`;

const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  animation: ${fadeIn} 0.8s ease-out;
  
  @media (max-width: 768px) {
    padding: 1rem;
    padding-bottom: calc(var(--mobile-menu-height) + 2rem);
  }
`;

const Header = styled.div`
  margin-bottom: 3rem;
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
    animation: ${glowPulse} 2s infinite;
  }
`;

const Title = styled.h1`
  color: var(--kali-blue);
  font-size: 2.5rem;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  animation: ${typing} 3s steps(40, end);
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const TerminalCursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 16px;
  background-color: var(--kali-blue);
  margin-left: 5px;
  animation: ${blink} 1s step-end infinite;
`;

const Subtitle = styled.p`
  color: var(--kali-text);
  font-size: 1.2rem;
  opacity: 0.8;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

interface ArticleCardProps {
  index: number;
}

const ArticleCard = styled(Link)<ArticleCardProps>`
  background: var(--kali-terminal-bg);
  border: 1px solid var(--kali-terminal-border);
  border-radius: 8px;
  padding: 1.5rem;
  color: var(--kali-text);
  text-decoration: none;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.8s ease-out ${props => props.index * 0.2}s both;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--kali-blue);
    box-shadow: 0 5px 15px rgba(114, 159, 207, 0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 0;
    background: var(--kali-blue);
    transition: height 0.3s ease;
  }
  
  &:hover::before {
    height: 100%;
  }
  
  @media (max-width: 768px) {
    padding: 1.2rem;
  }
`;

const ArticleTitle = styled.h2`
  color: var(--kali-blue);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50px;
    height: 2px;
    background: var(--kali-blue);
    transition: width 0.3s ease;
  }
  
  ${ArticleCard}:hover &::after {
    width: 100px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const ArticleDescription = styled.p`
  color: var(--kali-text);
  opacity: 0.8;
  margin-bottom: 1rem;
  line-height: 1.5;
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

const ArticleTag = styled.span`
  background: rgba(114, 159, 207, 0.1);
  color: var(--kali-blue);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  animation: ${slideIn} 0.5s ease-out ${props => props.index * 0.1}s both;
`;

const ArticleTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? 'var(--kali-blue)' : 'transparent'};
  color: ${props => props.active ? 'var(--kali-terminal-bg)' : 'var(--kali-blue)'};
  border: 1px solid var(--kali-blue);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Share Tech Mono', monospace;
  
  &:hover {
    background: ${props => props.active ? 'var(--kali-blue)' : 'rgba(114, 159, 207, 0.1)'};
  }
`;

// Article data
const articles = [
  {
    id: 1,
    title: '⚠️ Exposing a Critical RCE Vulnerability in Splunk',
    description: 'A detailed analysis of a severe Remote Code Execution vulnerability discovered in Splunk, including the technical details of the exploit and its implications for organizations using Splunk as their SIEM solution.',
    date: '2024-01-15',
    readTime: '15 min read',
    link: '/articles/splunk-rce',
    tags: ['Vulnerability', 'RCE', 'Splunk', 'Security']
  }
];

// Get unique tags from all articles
const allTags = Array.from(new Set(articles.flatMap(article => article.tags)));

const ArticlesView: React.FC = () => {
  const [typingText, setTypingText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filteredArticles, setFilteredArticles] = useState(articles);
  
  const fullText = "kali@kali:~/articles$ ls -la";
  
  useEffect(() => {
    if (currentCharIndex < fullText.length) {
      const timer = setTimeout(() => {
        setTypingText(prev => prev + fullText[currentCharIndex]);
        setCurrentCharIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentCharIndex, fullText]);
  
  useEffect(() => {
    if (activeFilter) {
      setFilteredArticles(articles.filter(article => 
        article.tags.includes(activeFilter)
      ));
    } else {
      setFilteredArticles(articles);
    }
  }, [activeFilter]);
  
  const handleFilterClick = (tag: string) => {
    setActiveFilter(activeFilter === tag ? null : tag);
  };
  
  return (
    <Container>
      <Header>
        <Title>
          {typingText}
          {currentCharIndex < fullText.length && <TerminalCursor />}
        </Title>
        <Subtitle>Explore my latest thoughts and insights on cybersecurity</Subtitle>
      </Header>
      
      <FilterContainer>
        <FilterButton 
          active={activeFilter === null} 
          onClick={() => setActiveFilter(null)}
        >
          All
        </FilterButton>
        {allTags.map(tag => (
          <FilterButton 
            key={tag} 
            active={activeFilter === tag}
            onClick={() => handleFilterClick(tag)}
          >
            {tag}
          </FilterButton>
        ))}
      </FilterContainer>
      
      <ArticleGrid>
        {filteredArticles.map((article, index) => (
          <ArticleCard key={article.id} to={article.link} index={index}>
            <ArticleTitle>{article.title}</ArticleTitle>
            <ArticleDescription>{article.description}</ArticleDescription>
            <ArticleTags>
              {article.tags.map((tag, tagIndex) => (
                <ArticleTag key={tag} index={tagIndex}>{tag}</ArticleTag>
              ))}
            </ArticleTags>
            <ArticleMeta>
              <span>{article.date}</span>
              <span>{article.readTime}</span>
            </ArticleMeta>
          </ArticleCard>
        ))}
      </ArticleGrid>
    </Container>
  );
};

export default ArticlesView; 
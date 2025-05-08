import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import TopBar from "./components/TopBar";
import RightMenu from "./components/RightMenu";
import LoadingScreen from "./components/LoadingScreen";
import { LoggingProvider } from './context/LoggingContext';
import './styles/kali-theme.css';
import AntiScriptKid from "./components/AntiScriptKid";

// Lazy load components for better performance
const HomePage = lazy(() => import("./components/HomePage"));
const CareerSection = lazy(() => import("./components/CareerSection"));
const ArticlesSection = lazy(() => import("./components/ArticlesSection"));
const SplunkRCEArticle = lazy(() => import("./components/SplunkRCEArticle"));
const LogsDashboard = lazy(() => import("./components/LogsDashboard"));

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: 'Share Tech Mono', monospace;
    background: var(--kali-bg);
    color: var(--kali-text);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
      font-size: 14px;
      padding-bottom: var(--mobile-menu-height);
    }
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: var(--kali-terminal-bg);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--kali-blue);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }

    ::-webkit-scrollbar {
      width: 0;
      display: none;
    }
  }

  .desktop-only {
    @media (max-width: 768px) {
      display: none;
    }
  }
  
  .mobile-only {
    @media (min-width: 769px) {
      display: none;
    }
  }
  
  /* Accessibility improvements */
  :focus {
    outline: 2px solid var(--kali-blue);
    outline-offset: 2px;
  }
  
  /* Improve tap targets on mobile */
  button, a, [role="button"] {
    min-height: 44px;
    min-width: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--kali-bg);
`;

const ContentContainer = styled.div`
  flex: 1;
  padding-right: var(--rightmenu-width);
  padding-top: var(--topbar-height);
  min-height: calc(100vh - var(--topbar-height));
  position: relative;
  transition: padding 0.3s ease;
  background: var(--kali-bg);

  @media (max-width: 768px) {
    padding-right: 0;
    padding-top: 0;
    padding-bottom: var(--mobile-menu-height);
    min-height: 100vh;
  }
`;

const UNLOCK_HASH = "1337_c0d3";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isUnlocked = (import.meta as any).env.UNLOCK === UNLOCK_HASH;

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isUnlocked) {
    return <AntiScriptKid />;
  }

  return (
    <Router>
      <LoggingProvider>
        <GlobalStyle />
        <AppContainer>
          <TopBar />
          <RightMenu />
          <ContentContainer>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/career" element={<CareerSection />} />
                <Route path="/articles" element={<ArticlesSection />} />
                <Route path="/articles/splunk-rce" element={<SplunkRCEArticle />} />
                <Route path="/logs" element={<LogsDashboard />} />
              </Routes>
            </Suspense>
          </ContentContainer>
        </AppContainer>
      </LoggingProvider>
    </Router>
  );
};

export default App; 
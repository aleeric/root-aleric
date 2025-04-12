import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import logger, { UserAction, ActionType } from '../utils/logger';

interface LoggingContextType {
  logAction: (type: ActionType, details: any) => void;
  getArticleViews: (articleId: string) => number;
  getAllArticleViews: () => Record<string, number>;
  getActions: () => UserAction[];
  getLogs: () => any[];
  getSessionInfo: () => { sessionId: string; startTime: string; duration: number };
  exportLogs: (format: 'json' | 'csv' | 'txt') => string;
  downloadLogs: (format: 'json' | 'csv' | 'txt') => void;
}

const LoggingContext = createContext<LoggingContextType | undefined>(undefined);

export const useLogging = () => {
  const context = useContext(LoggingContext);
  if (!context) {
    throw new Error('useLogging must be used within a LoggingProvider');
  }
  return context;
};

export const LoggingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [articleViews, setArticleViews] = useState<Record<string, number>>({});
  const [actions, setActions] = useState<UserAction[]>([]);
  const [logs, setLogs] = useState<any[]>([]);

  // Load initial data
  useEffect(() => {
    setArticleViews(logger.getAllArticleViews());
    setActions(logger.getActions());
    setLogs(logger.getLogs());
  }, []);

  // Log page views
  useEffect(() => {
    const viewerInfo = logger.getViewerInfo();
    logger.logViewer(viewerInfo);
    setLogs(prev => [...prev, viewerInfo]);
    
    logAction('PAGE_VIEW', {
      path: location.pathname,
      title: document.title
    });
  }, [location.pathname]);

  const logAction = (type: ActionType, details: any) => {
    logger.logAction(type, details);
    setActions(prev => [...prev, {
      type,
      timestamp: new Date().toISOString(),
      details
    }]);
    
    // Update article views if needed
    if (type === 'ARTICLE_VIEW' && details.articleId) {
      const newViews = logger.getAllArticleViews();
      setArticleViews(newViews);
    }
  };

  const getArticleViews = (articleId: string) => {
    return logger.getArticleViews(articleId);
  };

  const getAllArticleViews = () => {
    return logger.getAllArticleViews();
  };

  const getActions = () => {
    return logger.getActions();
  };

  const getLogs = () => {
    return logger.getLogs();
  };

  const getSessionInfo = () => {
    return logger.getSessionInfo();
  };

  const exportLogs = (format: 'json' | 'csv' | 'txt' = 'json') => {
    return logger.exportLogs(format);
  };

  const downloadLogs = (format: 'json' | 'csv' | 'txt' = 'json') => {
    logger.downloadLogs(format);
  };

  return (
    <LoggingContext.Provider value={{
      logAction,
      getArticleViews,
      getAllArticleViews,
      getActions,
      getLogs,
      getSessionInfo,
      exportLogs,
      downloadLogs
    }}>
      {children}
    </LoggingContext.Provider>
  );
}; 
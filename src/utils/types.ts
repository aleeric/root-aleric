// ViewerInfo interface for tracking page views and user information
export interface ViewerInfo {
  timestamp: string;
  source: string;
  userAgent: string;
  deviceType: string;
  screenResolution: string;
  path: string;
  referrer: string;
}

// LoggingContextValue interface for the React context
export interface LoggingContextValue {
  logViewer: (info: ViewerInfo) => void;
  logAction: (type: ActionType, details: any) => void;
  getLogs: () => ViewerInfo[];
  getActions: () => UserAction[];
  getArticleViews: (articleId: string) => number;
  getAllArticleViews: () => Record<string, number>;
  getSessionInfo: () => SessionInfo;
  exportLogs: (format: ExportFormat) => string;
  downloadLogs: (format: ExportFormat) => void;
}

// SessionInfo interface for tracking session data
export interface SessionInfo {
  sessionId: string;
  startTime: string;
  duration: number;
}

// ExportFormat type for log export options
export type ExportFormat = 'json' | 'csv' | 'txt';

// ActionType enum for different types of user actions
export type ActionType = 
  | 'PAGE_VIEW'
  | 'ARTICLE_VIEW'
  | 'CLICK'
  | 'NAVIGATION'
  | 'INTERACTION'
  | 'SCROLL'
  | 'FORM_INTERACTION'
  | 'RESOURCE_LOAD'
  | 'ERROR'
  | 'CUSTOM';

// UserAction interface for tracking user interactions
export interface UserAction {
  type: ActionType;
  timestamp: string;
  details: {
    path?: string;
    elementId?: string;
    elementType?: string;
    articleId?: string;
    articleTitle?: string;
    x?: number;
    y?: number;
    scrollDepth?: number;
    formId?: string;
    formField?: string;
    formValue?: string;
    resourceUrl?: string;
    resourceType?: string;
    errorMessage?: string;
    errorStack?: string;
    customData?: Record<string, any>;
    [key: string]: any;
  };
} 
import { ViewerInfo } from './types';

// Define action types
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

// Define the action interface
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

class Logger {
  private static instance: Logger;
  private logFile: string = 'viewer_logs.txt';
  private logs: ViewerInfo[] = [];
  private actions: UserAction[] = [];
  private articleViews: Record<string, number> = {};
  private sessionId: string;
  private sessionStartTime: string;

  private constructor() {
    // Load existing article views from localStorage
    const storedViews = localStorage.getItem('article_views');
    if (storedViews) {
      this.articleViews = JSON.parse(storedViews);
    }
    
    // Generate a unique session ID
    this.sessionId = this.generateSessionId();
    this.sessionStartTime = new Date().toISOString();
    
    // Set up event listeners for detailed tracking
    this.setupEventListeners();
  }

  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
  }

  private setupEventListeners(): void {
    // Track clicks
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target) {
        this.logAction('CLICK', {
          elementId: target.id,
          elementType: target.tagName,
          elementClass: target.className,
          x: e.clientX,
          y: e.clientY,
          path: window.location.pathname
        });
      }
    });

    // Track scroll depth
    let maxScroll = 0;
    document.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        this.logAction('SCROLL', {
          scrollDepth: maxScroll,
          path: window.location.pathname
        });
      }
    });

    // Track form interactions
    document.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        this.logAction('FORM_INTERACTION', {
          formId: target.form?.id || 'unknown',
          formField: target.name || target.id || 'unknown',
          formType: target.type || 'text',
          path: window.location.pathname
        });
      }
    });

    // Track resource loading
    window.addEventListener('load', () => {
      const resources = performance.getEntriesByType('resource');
      resources.forEach(resource => {
        this.logAction('RESOURCE_LOAD', {
          resourceUrl: resource.name,
          resourceType: resource.initiatorType,
          duration: resource.duration,
          path: window.location.pathname
        });
      });
    });

    // Track errors
    window.addEventListener('error', (e) => {
      this.logAction('ERROR', {
        errorMessage: e.message,
        errorStack: e.error?.stack,
        path: window.location.pathname
      });
    });
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private getDeviceType(userAgent: string): string {
    if (/mobile/i.test(userAgent)) {
      return 'Mobile';
    } else if (/tablet/i.test(userAgent)) {
      return 'Tablet';
    } else {
      return 'Desktop';
    }
  }

  private formatLogEntry(info: ViewerInfo): string {
    return `[${info.timestamp}] ${info.path} | Device: ${info.deviceType} | Resolution: ${info.screenResolution} | Source: ${info.source}`;
  }

  public logViewer(info: ViewerInfo): void {
    this.logs.push(info);
    console.log(this.formatLogEntry(info));
    
    // In a real application, you would send this to a server
    // For now, we'll just store it in memory and log to console
    localStorage.setItem('viewer_logs', JSON.stringify(this.logs));
  }

  public logAction(type: ActionType, details: any): void {
    const action: UserAction = {
      type,
      timestamp: new Date().toISOString(),
      details: {
        ...details,
        sessionId: this.sessionId
      }
    };
    
    this.actions.push(action);
    console.log(`[${action.timestamp}] ${action.type}:`, action.details);
    
    // Store actions in localStorage
    localStorage.setItem('user_actions', JSON.stringify(this.actions));
    
    // If this is an article view, increment the counter
    if (type === 'ARTICLE_VIEW' && details.articleId) {
      this.incrementArticleViews(details.articleId);
    }
  }

  public incrementArticleViews(articleId: string): void {
    if (!this.articleViews[articleId]) {
      this.articleViews[articleId] = 0;
    }
    this.articleViews[articleId]++;
    
    // Store updated views in localStorage
    localStorage.setItem('article_views', JSON.stringify(this.articleViews));
  }

  public getArticleViews(articleId: string): number {
    return this.articleViews[articleId] || 0;
  }

  public getAllArticleViews(): Record<string, number> {
    return this.articleViews;
  }

  public getViewerInfo(): ViewerInfo {
    const now = new Date();
    return {
      timestamp: now.toISOString(),
      source: document.referrer || 'Direct',
      userAgent: navigator.userAgent,
      deviceType: this.getDeviceType(navigator.userAgent),
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      path: window.location.pathname,
      referrer: document.referrer
    };
  }

  public getLogs(): ViewerInfo[] {
    const storedLogs = localStorage.getItem('viewer_logs');
    if (storedLogs) {
      this.logs = JSON.parse(storedLogs);
    }
    return this.logs;
  }

  public getActions(): UserAction[] {
    const storedActions = localStorage.getItem('user_actions');
    if (storedActions) {
      this.actions = JSON.parse(storedActions);
    }
    return this.actions;
  }

  public getSessionInfo(): { sessionId: string; startTime: string; duration: number } {
    const now = new Date();
    const startTime = new Date(this.sessionStartTime);
    const duration = now.getTime() - startTime.getTime();
    
    return {
      sessionId: this.sessionId,
      startTime: this.sessionStartTime,
      duration
    };
  }

  public exportLogs(format: 'json' | 'csv' | 'txt' = 'json'): string {
    const logs = this.getLogs();
    const actions = this.getActions();
    const articleViews = this.getAllArticleViews();
    const sessionInfo = this.getSessionInfo();
    
    const data = {
      sessionInfo,
      logs,
      actions,
      articleViews
    };
    
    switch (format) {
      case 'json':
        return JSON.stringify(data, null, 2);
      
      case 'csv':
        return this.convertToCSV(data);
      
      case 'txt':
        return this.convertToTXT(data);
      
      default:
        return JSON.stringify(data);
    }
  }

  private convertToCSV(data: any): string {
    // Create CSV for logs
    let csv = 'Session Info\n';
    csv += `Session ID,${data.sessionInfo.sessionId}\n`;
    csv += `Start Time,${data.sessionInfo.startTime}\n`;
    csv += `Duration (ms),${data.sessionInfo.duration}\n\n`;
    
    // Add page views
    csv += 'Page Views\n';
    csv += 'Timestamp,Path,Device Type,Screen Resolution,Source\n';
    data.logs.forEach((log: ViewerInfo) => {
      csv += `${log.timestamp},${log.path},${log.deviceType},${log.screenResolution},${log.source}\n`;
    });
    
    // Add actions
    csv += '\nUser Actions\n';
    csv += 'Timestamp,Type,Path,Details\n';
    data.actions.forEach((action: UserAction) => {
      csv += `${action.timestamp},${action.type},${action.details.path || ''},${JSON.stringify(action.details)}\n`;
    });
    
    // Add article views
    csv += '\nArticle Views\n';
    csv += 'Article ID,View Count\n';
    Object.entries(data.articleViews).forEach(([id, count]) => {
      csv += `${id},${count}\n`;
    });
    
    return csv;
  }

  private convertToTXT(data: any): string {
    let txt = '=== SESSION INFO ===\n';
    txt += `Session ID: ${data.sessionInfo.sessionId}\n`;
    txt += `Start Time: ${data.sessionInfo.startTime}\n`;
    txt += `Duration: ${data.sessionInfo.duration}ms\n\n`;
    
    txt += '=== PAGE VIEWS ===\n';
    data.logs.forEach((log: ViewerInfo) => {
      txt += `[${log.timestamp}] ${log.path} | Device: ${log.deviceType} | Resolution: ${log.screenResolution} | Source: ${log.source}\n`;
    });
    
    txt += '\n=== USER ACTIONS ===\n';
    data.actions.forEach((action: UserAction) => {
      txt += `[${action.timestamp}] ${action.type}: ${JSON.stringify(action.details)}\n`;
    });
    
    txt += '\n=== ARTICLE VIEWS ===\n';
    Object.entries(data.articleViews).forEach(([id, count]) => {
      txt += `${id}: ${count} views\n`;
    });
    
    return txt;
  }

  public downloadLogs(format: 'json' | 'csv' | 'txt' = 'json'): void {
    const data = this.exportLogs(format);
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `viewer_logs_${new Date().toISOString().replace(/:/g, '-')}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Export a singleton instance
const logger = Logger.getInstance();
export default logger; 
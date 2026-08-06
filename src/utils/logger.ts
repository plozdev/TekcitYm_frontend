export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  module: string;
  message: string;
  data?: any;
}

const STORAGE_KEY = 'tekcitym_app_logs';
const MAX_LOGS = 500;

// List of sensitive fields to automatically mask
const SENSITIVE_KEYS = [
  'password',
  'confirmPassword',
  'newPassword',
  'oldPassword',
  'token',
  'accessToken',
  'refreshToken',
  'resetToken',
  'otp',
  'code',
  'authorization',
];

/**
 * Deep clone and mask sensitive data before logging.
 */
function sanitizeData(data: any): any {
  if (data === null || data === undefined) return data;

  if (typeof data === 'string') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeData(item));
  }

  if (typeof data === 'object') {
    const sanitized: Record<string, any> = {};
    for (const key of Object.keys(data)) {
      const lowerKey = key.toLowerCase();
      const isSensitive = SENSITIVE_KEYS.some((sensitiveKey) =>
        lowerKey.includes(sensitiveKey.toLowerCase())
      );

      if (isSensitive) {
        sanitized[key] = '***[MASKED]***';
      } else {
        sanitized[key] = sanitizeData(data[key]);
      }
    }
    return sanitized;
  }

  return data;
}

class LoggerService {
  private memoryLogs: LogEntry[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
    
    // Expose helpers on window for quick browser devtools access
    if (typeof window !== 'undefined') {
      (window as any).__downloadLogs = () => this.downloadLogs();
      (window as any).__clearLogs = () => this.clearLogs();
      (window as any).__getLogs = () => this.getLogs();
    }
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.memoryLogs = JSON.parse(stored);
      }
    } catch {
      this.memoryLogs = [];
    }
  }

  private saveToStorage(): void {
    try {
      if (this.memoryLogs.length > MAX_LOGS) {
        this.memoryLogs = this.memoryLogs.slice(this.memoryLogs.length - MAX_LOGS);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.memoryLogs));
    } catch (err) {
      console.warn('[Logger] Failed to save logs to localStorage:', err);
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private addLog(level: LogLevel, module: string, message: string, data?: any): LogEntry {
    const sanitizedData = data ? sanitizeData(data) : undefined;
    const entry: LogEntry = {
      id: `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      level,
      module,
      message,
      data: sanitizedData,
    };

    this.memoryLogs.push(entry);
    this.saveToStorage();
    this.notifyListeners();

    // Stream log entry to Vite dev server to write directly to physical file logs/frontend.log
    if (typeof window !== 'undefined') {
      fetch('/dev-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entry }),
      }).catch(() => {
        // Silently ignore if server is not available or in production build
      });
    }

    // Mirror to standard console with formatting
    const consolePrefix = `[%c${entry.timestamp}%c] [%c${level}%c] [%c${module}%c]: ${message}`;
    const styles = [
      'color: #888', '',
      level === 'ERROR' ? 'color: #ef4444; font-weight: bold' :
      level === 'WARN' ? 'color: #f59e0b; font-weight: bold' :
      level === 'INFO' ? 'color: #3b82f6; font-weight: bold' : 'color: #10b981', '',
      'color: #a855f7; font-weight: bold', ''
    ];

    if (sanitizedData !== undefined) {
      console.groupCollapsed(consolePrefix, ...styles);
      console.log('Data:', sanitizedData);
      console.groupEnd();
    } else {
      console.log(consolePrefix, ...styles);
    }

    return entry;
  }


  public debug(module: string, message: string, data?: any): LogEntry {
    return this.addLog('DEBUG', module, message, data);
  }

  public info(module: string, message: string, data?: any): LogEntry {
    return this.addLog('INFO', module, message, data);
  }

  public warn(module: string, message: string, data?: any): LogEntry {
    return this.addLog('WARN', module, message, data);
  }

  public error(module: string, message: string, data?: any): LogEntry {
    return this.addLog('ERROR', module, message, data);
  }

  public getLogs(): LogEntry[] {
    return [...this.memoryLogs];
  }

  public clearLogs(): void {
    this.memoryLogs = [];
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
    this.notifyListeners();
    console.log('[Logger] All logs cleared.');
  }

  /**
   * Export all stored logs into a downloadable .log file.
   */
  public downloadLogs(filename?: string): void {
    const logs = this.getLogs();
    if (logs.length === 0) {
      alert('No logs available to download.');
      return;
    }

    const formattedLines = logs.map((log) => {
      let dataStr = '';
      if (log.data !== undefined) {
        try {
          dataStr = ` | Data: ${JSON.stringify(log.data)}`;
        } catch {
          dataStr = ` | Data: [Unserializable]`;
        }
      }
      return `[${log.timestamp}] [${log.level.padEnd(5)}] [${log.module}] ${log.message}${dataStr}`;
    });

    const header = `=================================================================\n` +
                   `TekcitYm FE Application Log Export\n` +
                   `Exported At: ${new Date().toISOString()}\n` +
                   `Total Entries: ${logs.length}\n` +
                   `=================================================================\n\n`;

    const blobContent = header + formattedLines.join('\n');
    const blob = new Blob([blobContent], { type: 'text/plain;charset=utf-8' });
    
    const nowStr = new Date().toISOString().replace(/[:.]/g, '-');
    const name = filename || `tekcitym-fe-logs-${nowStr}.log`;

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }
}

export const logger = new LoggerService();

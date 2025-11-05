type LogLevel = 'info' | 'debug' | 'warn' | 'error';

class Logger {
  private isDevelopment = import.meta.env.DEV;

  private log(level: LogLevel, ...args: unknown[]) {
    if (level === 'info' && !this.isDevelopment) {
      return;
    }

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    switch (level) {
      case 'info':
        console.log(prefix, ...args);
        break;
      case 'debug':
        console.debug(prefix, ...args);
        break;
      case 'warn':
        console.warn(prefix, ...args);
        break;
      case 'error':
        console.error(prefix, ...args);
        break;
    }
  }

  info(...args: unknown[]) {
    this.log('info', ...args);
  }

  debug(...args: unknown[]) {
    this.log('debug', ...args);
  }

  warn(...args: unknown[]) {
    this.log('warn', ...args);
  }

  error(...args: unknown[]) {
    this.log('error', ...args);
  }
}

const logger = new Logger();

export default logger;

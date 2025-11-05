type LogArgs = unknown[];

const logger = {
  info: (...args: LogArgs): void => {
    // TODO: add env specific skipping
    console.info('[INFO]', ...args);
  },
  debug: (...args: LogArgs): void => {
    console.debug('[DEBUG]', ...args);
  },
  warn: (...args: LogArgs): void => {
    console.warn('[WARN]', ...args);
  },
  error: (...args: LogArgs): void => {
    console.error('[ERROR]', ...args);
  },
};

export default logger;

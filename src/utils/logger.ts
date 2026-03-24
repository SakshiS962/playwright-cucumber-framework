type LogLevel = 'INFO' | 'ERROR' | 'DEBUG';

function log(level: LogLevel, message: string) {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} [${level}] ${message}`);
}

export const logger = {
  info: (msg: string) => log('INFO', msg),
  error: (msg: string) => log('ERROR', msg),
  debug: (msg: string) => log('DEBUG', msg),
};
import { errorHandler } from './errorHandler';

export default function setupErrorHandlers(): void {
  // listen for unhandled promise rejections
  process.on('unhandledRejection', (reason: string, promise: Promise<unknown>) => {
    errorHandler.handleUnhandledRejection(reason, promise);
  });

  // listen for uncaught exceptions
  process.on('uncaughtException', (err: Error, origin: string) => {
    console.error('Uncaught Exception:', err, 'at', origin);
    errorHandler.handleUncaughtException(err, origin);
  });
}

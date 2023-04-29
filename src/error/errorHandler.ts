import { Response } from 'express';

class ErrorHandler {
  public async handleRouteError(error: Error, responseStream: Response): Promise<void> {
    console.error(error);
    responseStream.status(500).json({ message: 'Server error' });
  }

  public handleUnhandledRejection(reason: string, promise: Promise<unknown>) {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
  }

  public handleUncaughtException(error: Error, origin: string) {
    console.error('Uncaught Exception:', error, 'at', origin);
    process.exit(1);
  }
}

export const errorHandler = new ErrorHandler();

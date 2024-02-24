import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { loggerConfig } from 'libs/utils/src/logger-config';
import { createLogger } from 'winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = createLogger({
        transports: [
            loggerConfig('HTTP')
        ]
      });

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;

      this.logger.info(
        `${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip}`,
      );
      
    });

    next();
  }
}
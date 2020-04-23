import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('LoggingInterceptor');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const owner: any = context.getClass();
    const request: Request = context.switchToHttp().getRequest();

    const { body, method, url } = request;

    this.logger.setContext(owner.name);
    this.logger.verbose(`>>> ${method} ${url} ${JSON.stringify(body || {})}`);

    return next
      .handle()
      .pipe(
        tap(response =>
          this.logger.verbose(
            `<<< ${method} ${url} ${JSON.stringify(response || {})}`,
          ),
        ),
      );
  }
}

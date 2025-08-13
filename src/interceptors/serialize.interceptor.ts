import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// export class SerializeInteceptor implements NestInterceptor {
// intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
//   // Exécute quelquechose avant qu'une requête soit gérée par le gestionnaire de requête.
//   console.log('Running  before handler: ', context);
// }
// }

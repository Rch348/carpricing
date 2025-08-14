import {
  CallHandler,
  ClassSerializerInterceptor,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Pour typer un peu + proprement l'argument passé à Serialize().
interface ClassConstructor {
  new (...args: any[]): {};
}

// ~ décorateur perso > prend en paramètre la donnée à utiliser pour la serialisation.
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {} // Ajout d'un constructeur afin de rendre cette classe instanciable et ainsi, un intercepteur réutilisable.

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Code exécuté avant qu'une requête soit gérée par le gestionnaire de requête.
    // ...

    return handler.handle().pipe(
      // data sera la donnée sortante dans la réponse.
      map((data: any) => {
        // Code exécuté avant l'envoi de la réponse.
        // Pas approprié car l'intercepteur peut être amené à effectuer des actions sur d'autres objets (ex : photos, messages ...).
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

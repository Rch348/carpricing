import { Expose } from 'class-transformer';

// Classe liée à SerializeInterceptor.
export class UserDto {
  // Inclut la propriété dans la réponse pour l'exposer au 'monde extérieur'.
  @Expose()
  id: number;

  @Expose()
  email: string;
}

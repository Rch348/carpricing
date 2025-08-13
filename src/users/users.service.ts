import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // '@InjectRepository(User) est une petite aide du système d'injection de dépendance, lui disant que user repository est nécessaire au cours de l'exécution
  // > ce décorateur est requis car on doit utiliser un type générique dasn Repository (User).
  // 'repo' aura une instance du type Repository fonctionnant avec des instances de type User > Ce repository va gérer des users.
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    // create() ne persiste ou enregistre aucune info dans la bdd > sélectionne les infos, crée une nouvelle instance d'une entité et lui assigne les données (email & pwd) => meilleure pratique car validation des données & création d'une entité au lieu d'un simple objet.
    const user = this.repo.create({ email, password });
    // Récupère les données de l'instance de l'entité créée et l'enregistre en bdd.
    return this.repo.save(user);
    // Si les données sont directement passées à save() (sous forme d'objet), les hooks ne seront pas exécutés s'il y en a > A EVITER !
    // return this.repo.save({ email, password });
  }

  findOne(id: number) {
    // Ne jamais jeter de NotFoundException ici, sinon le faire dans le contrôleur ou retourner 'null' ici si nécessaire.
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    // Avec save(), les hooks seront exécutés.
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Avec remove(), les hooks seront exécutés.
    return this.repo.remove(user);
  }
}

// Si il y avait update(id: number, attrs: Partial<User>) {} dans la classe UsersService, il faudrait faire :
// const usersService = new UsersService({} as any);
// usersService.update(1, { email: 'abcd', password: 'abcd@example.com' });

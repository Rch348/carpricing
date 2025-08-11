import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      // TypeORM & SQLite travaillent ensemble pour créer un fichier de bdd car SQLite enregistre des infos dans un fichier brut.
      database: 'db.sqlite',
      // Connexion de l'entité au root connection.
      entities: [User, Report],
      synchronize: true
    }),
    UsersModule,
    ReportsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

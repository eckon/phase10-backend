import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { RoundsModule } from './rounds/rounds.module';
import { RoundInformationsModule } from './round-informations/roundInformations.module';
import { AccountsModule } from './accounts/accounts.module';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    GamesModule,
    RoundsModule,
    RoundInformationsModule,
    UsersModule,
    AccountsModule,
    AuthenticationModule,
  ],
  providers: [AuthenticationService],
})
export class AppModule {}

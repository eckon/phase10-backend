import { Module } from '@nestjs/common';
import { AccountsModule } from 'src/accounts/accounts.module';
import { AuthenticationService } from './authentication.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthenticationController } from './authentication.controller';

@Module({
    imports: [AccountsModule, PassportModule],
    providers: [AuthenticationService, LocalStrategy],
    controllers: [AuthenticationController],
})
export class AuthenticationModule {}

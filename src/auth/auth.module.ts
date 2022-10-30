import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { authController } from './auth.controller'
import { authService } from './auth.service'
import { JwtStrategy } from './strategy'

@Module({
  imports: [JwtModule.register({})],
  controllers: [authController],
  providers: [authService, JwtStrategy],
})
export class AuthModule {}

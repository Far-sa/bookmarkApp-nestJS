import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor (
    configService: ConfigService,
    private PrismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    })
  }
  async validate (payload: { sub: number; email: string }) {
    const user = await this.PrismaService.user.findUnique({
      where: { id: payload.sub },
    })

    delete user.hash
    return user
  }
}

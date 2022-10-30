import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as argon from 'argon2'

import { PrismaService } from '../prisma/prisma.service'
import { AuthDto } from './dto'

@Injectable()
export class authService {
  constructor (
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configServer: ConfigService,
  ) {}
  async register (dto: AuthDto) {
    try {
      //* generate hash Pass
      const hash = await argon.hash(dto.password)

      //* create User in DB
      const user = await this.prismaService.user.create({
        data: {
          hash,
          email: dto.email,
        },
      })

      return this.tokenGenerator(user.id, user.email)

      //return 'user has been registered'
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken')
        }
      }
      throw error
    }
  }

  async login (dto: AuthDto) {
    try {
      // find user
      const user = await this.prismaService.user.findUnique({
        where: { email: dto.email },
      })
      if (!user) throw new ForbiddenException('Credentials incorrect')
      // compare pass
      const pwMatches = await argon.verify(user.hash, dto.password)
      if (!pwMatches) throw new ForbiddenException('Credentials incorrect')
      return this.tokenGenerator(user.id, user.email)
    } catch (error) {
      throw error
    }
  }

  async tokenGenerator (
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = { sub: userId, email }
    const secretKey = this.configServer.get('JWT_SECRET')
    const token = await this.jwtService.signAsync(payload, {
      secret: secretKey,
      expiresIn: '15m',
    })
    return {
      accessToken: token,
    }
  }
}

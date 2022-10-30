import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as argon from 'argon2'

import { PrismaService } from '../prisma/prisma.service'
import { AuthDto } from './dto'

@Injectable()
export class authService {
  constructor (private prismaService: PrismaService) {}
  async register (dto: AuthDto) {
    try {
      //* generate hash Pass
      const hash = await argon.hash(dto.password)

      //* create User in DB
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash,
        },
        select: {
          id: true,
          createAt: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      })

      return user
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
      delete user.hash
      return user
    } catch (error) {
      throw error
    }
  }
}

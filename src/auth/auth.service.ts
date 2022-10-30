import { Injectable } from '@nestjs/common'
import { User, Bookmark } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class authService {
  constructor (private prismaService: PrismaService) {}
  register () {
    return 'Registering process'
  }
  login () {
    return 'logging in .....'
  }
}

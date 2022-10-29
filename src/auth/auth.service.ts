import { Injectable } from '@nestjs/common'
import { User, Bookmark } from '@prisma/client'

@Injectable({})
export class authService {
  register () {
    return 'Registering process'
  }
  login () {
    return 'logging in .....'
  }
}

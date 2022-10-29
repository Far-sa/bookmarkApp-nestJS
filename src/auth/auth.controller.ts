import { Controller, Post } from '@nestjs/common'
import { authService } from './auth.service'

@Controller('auth')
export class authController {
  constructor (private readonly authService: authService) {}

  @Post('register')
  signup () {
    return this.authService.register()
  }

  @Post('login')
  signin () {
    return this.authService.login()
  }
}

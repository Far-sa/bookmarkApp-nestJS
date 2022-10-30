import { Body, Controller, Post } from '@nestjs/common'
import { authService } from './auth.service'
import { AuthDto } from './dto'

@Controller('auth')
export class authController {
  constructor (private readonly authService: authService) {}

  @Post('register')
  signup (@Body() dto: AuthDto) {
    return this.authService.register(dto)
  }

  @Post('login')
  signin (@Body() dto: AuthDto) {
    return this.authService.login(dto)
  }
}

import { Body, Controller, Post } from '@nestjs/common'
import { authService } from './auth.service'
import { AuthDto } from './dto'

@Controller('auth')
export class authController {
  constructor (private readonly authService: authService) {}

  @Post('register')
  signup (@Body() dto: AuthDto) {
    console.log({ dto })
    //return this.authService.register()
  }

  @Post('login')
  signin () {
    return this.authService.login()
  }
}

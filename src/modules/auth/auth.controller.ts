import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './strategy/local-auth.guard';
import { RequestWithUser } from './interface/RequestWithUser';

@Controller('auth')
export class AuthController {
  @Post('signin')
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() req: RequestWithUser) {
    return req.user;
  }
}

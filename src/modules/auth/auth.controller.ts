import { Controller, Post, Request, UseGuards, Version } from '@nestjs/common';
import { RequestWithUser } from './interface/RequestWithUser';
import { LocalAuthGuard } from '@/guards';

@Controller('auth')
export class AuthController {
  @Post('signin')
  @Version('1')
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() req: RequestWithUser) {
    return req.user;
  }
}

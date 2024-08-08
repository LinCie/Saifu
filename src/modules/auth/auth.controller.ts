import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Version,
} from '@nestjs/common';
import { RequestWithUser } from './interface/RequestWithUser';
import { JwtRefreshGuard, LocalAuthGuard } from '@/guards';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @Version('1')
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() req: RequestWithUser) {
    return this.authService.signIn(req.user);
  }

  @Post('signup')
  @Version('1')
  async signUp(@Body() body: CreateUserDto) {
    return this.authService.signUp(body);
  }

  @Post('refresh')
  @Version('1')
  @UseGuards(JwtRefreshGuard)
  async refresh(@Request() req: RequestWithUser) {
    return this.authService.refresh(req.user);
  }
}

import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), MikroOrmModule.forRoot(), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

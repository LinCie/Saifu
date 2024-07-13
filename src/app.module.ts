import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forRoot(), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

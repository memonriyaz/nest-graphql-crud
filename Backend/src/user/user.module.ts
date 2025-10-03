import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './resolvers/user.resolver';
import { User, UserSchema } from './models/user.models';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, UserResolver],
})
export class UserModule {}

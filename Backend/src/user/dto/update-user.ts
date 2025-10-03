import { CreateUserInput } from './create-user';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  _id: string;
}

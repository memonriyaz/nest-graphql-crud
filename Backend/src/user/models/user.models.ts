import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Schema()
@ObjectType()
export class User extends Document {
  @Field(() => ID)
  declare readonly _id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true, unique: true })
  @Field()
  email: string;

  @Prop({ default: 'User' })
  @Field({ defaultValue: 'User' })
  userRole: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

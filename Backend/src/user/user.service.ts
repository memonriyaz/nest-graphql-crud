import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user.models';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user';
import { UpdateUserInput } from './dto/update-user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(input: CreateUserInput): Promise<User> {
    const user = new this.userModel(input);
    return user.save();
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException("User Doesn't Exists");
    return user;
  }

  async removeUser(id: string): Promise<boolean> {
    const existingUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!existingUser) throw new NotFoundException("User Doesn't Exists");
    return true;
  }

  async updateUser(input: UpdateUserInput): Promise<User> {
    const existingUser = await this.userModel.findById(input._id).exec();
    if (!existingUser) throw new NotFoundException("User Doesn't Exists");
    Object.assign(existingUser, input);
    return existingUser.save();
  }
}

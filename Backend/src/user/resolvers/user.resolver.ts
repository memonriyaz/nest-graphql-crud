import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from '../user.service';
import { User } from '../models/user.models';
import { CreateUserInput } from '../dto/create-user';
import { UpdateUserInput } from '../dto/update-user';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'getAllUsers' })
  async findAll() {
    return this.userService.getAllUsers();
  }
  @Query(() => User, { name: 'getUser' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.getUser(id);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => User)
  async updateUser(@Args('input') input: UpdateUserInput) {
    return this.userService.updateUser(input);
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.removeUser(id);
  }
}

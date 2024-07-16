import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import User from '@/entities/User.entity';

const moduleMocker = new ModuleMocker(global);

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .useMocker((token) => {
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create user', async () => {
    const createUserDto = { username: 'username', password: 'Password123!' };
    expect(await controller.create(createUserDto)).toBeDefined();
  });

  it('should find all user', async () => {
    const mockUsers: User[] = [
      new User('username', 'password'),
      new User('username2', 'password'),
      new User('username3', 'password'),
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(mockUsers);

    const result = await controller.findAll();
    expect(result).toEqual(mockUsers);
  });

  it('should find user by username', async () => {
    const mockUsers: User[] = [
      new User('username', 'password'),
      new User('username2', 'password'),
      new User('username3', 'password'),
    ];

    jest.spyOn(service, 'findOne').mockResolvedValue(mockUsers[0]);

    const result = await controller.findOne('username');
    expect(result).toEqual(mockUsers[0]);
  });
});

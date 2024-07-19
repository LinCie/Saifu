import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import User from '@/entities/User.entity';
import { EntityManager } from '@mikro-orm/mongodb';

const moduleMocker = new ModuleMocker(global);

describe('UsersService', () => {
  let service: UsersService;
  let em: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    })
      .useMocker((token) => {
        if (token === EntityManager) {
          return {
            findAll: jest.fn(),
            findOneOrFail: jest.fn(),
            persistAndFlush: jest.fn(),
            assign: jest.fn(),
            findOne: jest.fn(),
            flush: jest.fn(),
            removeAndFlush: jest.fn(),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    service = module.get<UsersService>(UsersService);
    em = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', async () => {
    const createUserDto = { username: 'username', password: 'Password123!' };
    expect(await service.create(createUserDto)).toBeDefined();
  });

  it('should find all user', async () => {
    const mockUsers: User[] = [
      new User('username', 'password'),
      new User('username2', 'password'),
      new User('username3', 'password'),
    ];

    jest.spyOn(em, 'findAll').mockResolvedValue(mockUsers);

    const result = await service.findAll();
    expect(result).toEqual(mockUsers);
  });

  it('should find user by username', async () => {
    const mockUsers: User[] = [
      new User('username', 'password'),
      new User('username2', 'password'),
      new User('username3', 'password'),
    ];

    jest.spyOn(em, 'findOneOrFail').mockResolvedValue(mockUsers[0]);

    const result = await service.findOne('username');
    expect(result).toEqual(mockUsers[0]);
  });

  it('should update user', async () => {
    const mockNewUser = new User('newuser123', 'password');

    jest.spyOn(em, 'findOne').mockResolvedValue({ ...mockNewUser });

    const result = await service.update(mockNewUser.id, {
      username: 'updateduser12',
    });
    expect(result).toEqual(mockNewUser);
  });

  it('should delete user', async () => {
    const mockNewUser = new User('newuser123', 'password');
    expect(await service.remove(mockNewUser.id));
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { GithubUserController } from '../github-user/github-user.controller';

describe('GithubUserController', () => {
  let controller: GithubUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GithubUserController],
    }).compile();

    controller = module.get<GithubUserController>(GithubUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

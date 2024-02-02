import { Test, TestingModule } from '@nestjs/testing';
import { GithubUserService } from './github-user.service';

describe('GithubUserService', () => {
  let service: GithubUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubUserService],
    }).compile();

    service = module.get<GithubUserService>(GithubUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('InjectRepository', () => {
    it('', () => {});
  });
});

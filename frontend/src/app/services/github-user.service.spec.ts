import { TestBed } from '@angular/core/testing';

import { GithubUserService } from './github-user.service';

describe('GithubUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GithubUserService = TestBed.get(GithubUserService);
    expect(service).toBeTruthy();
  });
});

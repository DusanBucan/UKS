import { TestBed } from '@angular/core/testing';

import { IssueEditService } from './issue-edit.service';

describe('IssueEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IssueEditService = TestBed.get(IssueEditService);
    expect(service).toBeTruthy();
  });
});

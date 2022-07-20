import { TestBed } from '@angular/core/testing';

import { ComplejoService } from './complejo.service';

describe('ComplejoService', () => {
  let service: ComplejoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplejoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

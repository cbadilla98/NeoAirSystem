import { TestBed } from '@angular/core/testing';

import { TiqueteService } from './tiquete.service';

describe('TiqueteService', () => {
  let service: TiqueteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiqueteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

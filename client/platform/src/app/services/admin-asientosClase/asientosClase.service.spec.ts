import { TestBed } from '@angular/core/testing';

import { AsientosClaseService } from './asientosClase.service';

describe('Service', () => {
  let service: AsientosClaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsientosClaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

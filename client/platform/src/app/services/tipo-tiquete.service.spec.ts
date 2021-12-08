import { TestBed } from '@angular/core/testing';

import { TipoTiqueteService } from './tipo-tiquete.service';

describe('TipoTiqueteService', () => {
  let service: TipoTiqueteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoTiqueteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

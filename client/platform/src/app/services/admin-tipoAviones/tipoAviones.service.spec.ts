import { TestBed } from '@angular/core/testing';

import { TipoAvionesService } from './tipoAviones.service';

describe('ServiceTipoAviones', () => {
  let service: TipoAvionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoAvionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

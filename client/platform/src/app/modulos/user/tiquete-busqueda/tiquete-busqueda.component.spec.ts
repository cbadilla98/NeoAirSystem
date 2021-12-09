import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiqueteBusquedaComponent } from './tiquete-busqueda.component';

describe('TiqueteBusquedaComponent', () => {
  let component: TiqueteBusquedaComponent;
  let fixture: ComponentFixture<TiqueteBusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiqueteBusquedaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiqueteBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

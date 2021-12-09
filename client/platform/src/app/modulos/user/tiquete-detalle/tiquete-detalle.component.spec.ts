import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiqueteDetalleComponent } from './tiquete-detalle.component';

describe('TiqueteDetalleComponent', () => {
  let component: TiqueteDetalleComponent;
  let fixture: ComponentFixture<TiqueteDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiqueteDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiqueteDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

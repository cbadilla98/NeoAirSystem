import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAvionComponent } from './tipo-avion.component';

describe('TipoAvionComponent', () => {
  let component: TipoAvionComponent;
  let fixture: ComponentFixture<TipoAvionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoAvionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAvionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

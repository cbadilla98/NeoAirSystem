import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoTiqueteComponent } from './tipo-tiquete.component';

describe('TipoTiqueteComponent', () => {
  let component: TipoTiqueteComponent;
  let fixture: ComponentFixture<TipoTiqueteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoTiqueteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoTiqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

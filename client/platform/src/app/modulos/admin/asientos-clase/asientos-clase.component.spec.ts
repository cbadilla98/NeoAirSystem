import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsientosClaseComponent } from './asientos-clase.component';

describe('AsientosClaseComponent', () => {
  let component: AsientosClaseComponent;
  let fixture: ComponentFixture<AsientosClaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsientosClaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsientosClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvionesFormComponent } from './aviones-form.component';

describe('AvionesFormComponent', () => {
  let component: AvionesFormComponent;
  let fixture: ComponentFixture<AvionesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvionesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvionesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

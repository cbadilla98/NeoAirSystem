import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiqueteFormComponent } from './tiquete-form.component';

describe('TiqueteFormComponent', () => {
  let component: TiqueteFormComponent;
  let fixture: ComponentFixture<TiqueteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiqueteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiqueteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

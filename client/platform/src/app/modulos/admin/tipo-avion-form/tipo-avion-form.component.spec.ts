import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAvionFormComponent } from './tipo-avion-form.component';

describe('TipoAvionFormComponent', () => {
  let component: TipoAvionFormComponent;
  let fixture: ComponentFixture<TipoAvionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoAvionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAvionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

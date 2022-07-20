import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarComplejoComponent } from './modificar-complejo.component';

describe('ModificarComplejoComponent', () => {
  let component: ModificarComplejoComponent;
  let fixture: ComponentFixture<ModificarComplejoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarComplejoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarComplejoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

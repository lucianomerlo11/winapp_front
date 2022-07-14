import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionComplejoComponent } from './gestion-complejo.component';

describe('GestionComplejoComponent', () => {
  let component: GestionComplejoComponent;
  let fixture: ComponentFixture<GestionComplejoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionComplejoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionComplejoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

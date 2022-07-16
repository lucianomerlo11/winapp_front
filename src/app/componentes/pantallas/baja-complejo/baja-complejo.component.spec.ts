import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaComplejoComponent } from './baja-complejo.component';

describe('BajaComplejoComponent', () => {
  let component: BajaComplejoComponent;
  let fixture: ComponentFixture<BajaComplejoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BajaComplejoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BajaComplejoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

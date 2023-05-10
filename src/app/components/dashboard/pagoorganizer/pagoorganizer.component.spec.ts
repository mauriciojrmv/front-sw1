import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoorganizerComponent } from './pagoorganizer.component';

describe('PagoorganizerComponent', () => {
  let component: PagoorganizerComponent;
  let fixture: ComponentFixture<PagoorganizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoorganizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoorganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

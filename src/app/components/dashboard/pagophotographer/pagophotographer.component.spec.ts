import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagophotographerComponent } from './pagophotographer.component';

describe('PagophotographerComponent', () => {
  let component: PagophotographerComponent;
  let fixture: ComponentFixture<PagophotographerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagophotographerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagophotographerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroundsComponent } from './create-grounds.component';

describe('CreateGroundsComponent', () => {
  let component: CreateGroundsComponent;
  let fixture: ComponentFixture<CreateGroundsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateGroundsComponent]
    });
    fixture = TestBed.createComponent(CreateGroundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

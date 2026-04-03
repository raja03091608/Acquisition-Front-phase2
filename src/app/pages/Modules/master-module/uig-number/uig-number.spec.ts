import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UigNumber } from './uig-number';

describe('UigNumber', () => {
  let component: UigNumber;
  let fixture: ComponentFixture<UigNumber>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UigNumber]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UigNumber);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

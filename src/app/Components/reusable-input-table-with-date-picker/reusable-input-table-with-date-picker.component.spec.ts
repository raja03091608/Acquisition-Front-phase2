import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableInputTableWithDatePickerComponent } from './reusable-input-table-with-date-picker.component';

describe('ReusableInputTableWithDatePickerComponent', () => {
  let component: ReusableInputTableWithDatePickerComponent;
  let fixture: ComponentFixture<ReusableInputTableWithDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableInputTableWithDatePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusableInputTableWithDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableDeleteDialogComponent } from './reusable-delete-dialog.component';

describe('ReusableDeleteDialogComponent', () => {
  let component: ReusableDeleteDialogComponent;
  let fixture: ComponentFixture<ReusableDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReusableDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusableDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

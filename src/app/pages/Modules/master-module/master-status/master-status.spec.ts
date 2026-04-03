import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterStatus } from './master-status';

describe('MasterStatus', () => {
  let component: MasterStatus;
  let fixture: ComponentFixture<MasterStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterClass } from './master-class';

describe('MasterClass', () => {
  let component: MasterClass;
  let fixture: ComponentFixture<MasterClass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterClass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterClass);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartmentsMaster } from './compartments-master';

describe('CompartmentsMaster', () => {
  let component: CompartmentsMaster;
  let fixture: ComponentFixture<CompartmentsMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompartmentsMaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompartmentsMaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

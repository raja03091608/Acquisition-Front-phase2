import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsMaster } from './units-master';

describe('UnitsMaster', () => {
  let component: UnitsMaster;
  let fixture: ComponentFixture<UnitsMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitsMaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitsMaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

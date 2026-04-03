import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipMaster } from './ship-master';

describe('ShipMaster', () => {
  let component: ShipMaster;
  let fixture: ComponentFixture<ShipMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipMaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipMaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

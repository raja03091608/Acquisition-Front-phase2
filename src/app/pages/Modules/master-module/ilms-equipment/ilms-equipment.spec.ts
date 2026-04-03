import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlmsEquipment } from './ilms-equipment';

describe('IlmsEquipment', () => {
  let component: IlmsEquipment;
  let fixture: ComponentFixture<IlmsEquipment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IlmsEquipment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IlmsEquipment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

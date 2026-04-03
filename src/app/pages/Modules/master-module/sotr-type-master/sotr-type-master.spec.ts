import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SotrTypeMaster } from './sotr-type-master';

describe('SotrTypeMaster', () => {
  let component: SotrTypeMaster;
  let fixture: ComponentFixture<SotrTypeMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SotrTypeMaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SotrTypeMaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlmsSpars } from './ilms-spars';

describe('IlmsSpars', () => {
  let component: IlmsSpars;
  let fixture: ComponentFixture<IlmsSpars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IlmsSpars]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IlmsSpars);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

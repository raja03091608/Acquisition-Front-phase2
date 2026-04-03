import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorateMaster } from './directorate-master';

describe('DirectorateMaster', () => {
  let component: DirectorateMaster;
  let fixture: ComponentFixture<DirectorateMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectorateMaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorateMaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

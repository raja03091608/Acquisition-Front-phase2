import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kmc } from './kmc';

describe('Kmc', () => {
  let component: Kmc;
  let fixture: ComponentFixture<Kmc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kmc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Kmc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SssSection } from './sss-section';

describe('SssSection', () => {
  let component: SssSection;
  let fixture: ComponentFixture<SssSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SssSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SssSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

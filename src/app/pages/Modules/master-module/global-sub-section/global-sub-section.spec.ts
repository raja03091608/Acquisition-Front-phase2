import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSubSection } from './global-sub-section';

describe('GlobalSubSection', () => {
  let component: GlobalSubSection;
  let fixture: ComponentFixture<GlobalSubSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalSubSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalSubSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSubSubSection } from './global-sub-sub-section';

describe('GlobalSubSubSection', () => {
  let component: GlobalSubSubSection;
  let fixture: ComponentFixture<GlobalSubSubSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalSubSubSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalSubSubSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

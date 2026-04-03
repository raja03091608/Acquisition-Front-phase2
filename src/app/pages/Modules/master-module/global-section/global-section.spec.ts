import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSection } from './global-section';

describe('GlobalSection', () => {
  let component: GlobalSection;
  let fixture: ComponentFixture<GlobalSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

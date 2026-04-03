import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectType } from './project-type';

describe('ProjectType', () => {
  let component: ProjectType;
  let fixture: ComponentFixture<ProjectType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

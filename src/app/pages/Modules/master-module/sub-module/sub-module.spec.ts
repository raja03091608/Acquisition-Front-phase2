import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubModule } from './sub-module';

describe('SubModule', () => {
  let component: SubModule;
  let fixture: ComponentFixture<SubModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

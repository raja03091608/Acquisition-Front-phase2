import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommenterModretor } from './commenter-modretor';

describe('CommenterModretor', () => {
  let component: CommenterModretor;
  let fixture: ComponentFixture<CommenterModretor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommenterModretor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommenterModretor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

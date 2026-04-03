import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginateTableLoadingComponent } from './paginate-table-loading.component';

describe('PaginateTableLoadingComponent', () => {
  let component: PaginateTableLoadingComponent;
  let fixture: ComponentFixture<PaginateTableLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginateTableLoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginateTableLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

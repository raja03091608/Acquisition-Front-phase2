import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandsMaster } from './commands-master';

describe('CommandsMaster', () => {
  let component: CommandsMaster;
  let fixture: ComponentFixture<CommandsMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommandsMaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandsMaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

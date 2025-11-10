import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCheckboxComponent } from './team-checkbox.component';

describe('TeamCheckboxComponent', () => {
  let component: TeamCheckboxComponent;
  let fixture: ComponentFixture<TeamCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [TeamCheckboxComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

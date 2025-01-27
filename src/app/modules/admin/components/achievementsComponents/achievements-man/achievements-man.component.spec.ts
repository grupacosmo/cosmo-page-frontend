import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementsManComponent } from './achievements-man.component';

describe('AchievementsManComponent', () => {
  let component: AchievementsManComponent;
  let fixture: ComponentFixture<AchievementsManComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [AchievementsManComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(AchievementsManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

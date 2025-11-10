import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievmentDetailsDialogComponent } from './achievment-details-dialog.component';

describe('AchievmentDetailsDialogComponent', () => {
  let component: AchievmentDetailsDialogComponent;
  let fixture: ComponentFixture<AchievmentDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AchievmentDetailsDialogComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(AchievmentDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarBurgerItemComponent } from './sidebar-burger-item.component';

describe('SidebarBurgerItemComponent', () => {
  let component: SidebarBurgerItemComponent;
  let fixture: ComponentFixture<SidebarBurgerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [SidebarBurgerItemComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarBurgerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

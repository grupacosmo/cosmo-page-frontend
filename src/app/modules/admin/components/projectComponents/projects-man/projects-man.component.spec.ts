import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsManComponent } from './projects-man.component';

describe('ProjectsManComponent', () => {
  let component: ProjectsManComponent;
  let fixture: ComponentFixture<ProjectsManComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsManComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectsManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

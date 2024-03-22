import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsManComponent } from './posts-man.component';

describe('PostsManComponent', () => {
  let component: PostsManComponent;
  let fixture: ComponentFixture<PostsManComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsManComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostsManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

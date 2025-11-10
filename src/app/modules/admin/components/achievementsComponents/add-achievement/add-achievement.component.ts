import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-add-achievement',
    templateUrl: './add-achievement.component.html',
    styleUrl: './add-achievement.component.scss',
    imports: [ReactiveFormsModule]
})
export class AddAchievementComponent implements OnInit {
  achievementForm: any;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.achievementForm = this.formBuilder.group({
      title: [''],
    });
  }

  onPost() {
    
  }
}

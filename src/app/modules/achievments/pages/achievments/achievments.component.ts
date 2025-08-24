import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AchievmentItem } from 'src/app/shared/models/achievments';
import { AchievmentService } from 'src/app/shared/services/achievment.service';
import { AchievmentDetailsDialogComponent } from '../../components/achievment-details-dialog/achievment-details-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-achievments',
    templateUrl: './achievments.component.html',
    styleUrls: ['./achievments.component.scss', '../../style.scss'],
    imports: [MatIcon, AsyncPipe]
})
export class AchievmentsComponent {
  achievments$!: Observable<AchievmentItem[]>;

  constructor(
      private achievmentService: AchievmentService,
      public dialog: MatDialog
    ) {}

  ngOnInit() {
    this.achievments$ = this.achievmentService.getAchievments();
  }

  openDetails(achievment: AchievmentItem) {
    const dialogRef = this.dialog.open(AchievmentDetailsDialogComponent, {
      data: { achievment },
      autoFocus: false
    });
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { AchievmentItem } from 'src/app/shared/models/achievments';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CdkScrollable } from '@angular/cdk/scrolling';

@Component({
    selector: 'app-achievment-details-dialog',
    templateUrl: './achievment-details-dialog.component.html',
    styleUrls: ['./achievment-details-dialog.component.scss', '../../style.scss'],
    imports: [MatIconButton, MatIcon, CdkScrollable, MatDialogContent]
})
export class AchievmentDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AchievmentDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { achievment: AchievmentItem },
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}

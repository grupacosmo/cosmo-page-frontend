import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from './controls/custom-button/custom-button.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { NewsSummaryComponent } from './components/news-summary/news-summary.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CustomButtonComponent,
    NewsSummaryComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CustomButtonComponent,
    NewsSummaryComponent,
    TruncatePipe
  ]
})
export class SharedModule { }

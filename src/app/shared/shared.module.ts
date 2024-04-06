import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from './controls/custom-button/custom-button.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { NewsSummaryComponent } from './components/news-summary/news-summary.component';
import { RouterModule } from '@angular/router';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tabs/tab/tab.component';



@NgModule({
  declarations: [
    CustomButtonComponent,
    NewsSummaryComponent,
    TruncatePipe,
    TabsComponent,
    TabComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CustomButtonComponent,
    NewsSummaryComponent,
    TruncatePipe,
    TabsComponent,
    TabComponent
  ]
})
export class SharedModule { }

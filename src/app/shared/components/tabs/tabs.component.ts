import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrl: './tabs.component.scss',
    standalone: false
})
export class TabsComponent implements AfterContentInit {
    @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

    ngAfterContentInit(): void {
      const activeTabs = this.tabs.filter(tab => tab.active)

      if (activeTabs.length === 0) {
        this.selectTab(this.tabs.first);
      }
    }

    selectTab(tab: TabComponent) {
      this.tabs.toArray().forEach(tab => (tab.active = false));
      tab.active = true;
    }
}

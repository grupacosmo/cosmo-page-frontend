import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class SidebarService {
    isSidebarOpened: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    onToggle(isOpened: boolean){
        this.isSidebarOpened.next(isOpened);
    }
}

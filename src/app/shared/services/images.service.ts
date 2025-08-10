import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    private http: HttpService = inject(HttpService);
    private readonly apiController: string = 'api/images';

    constructor() {}

    addImages(images: FileList): Observable<void> {
        const formData = new FormData();
        for(let i = 0; i < images.length; i++) {
            formData.append('images', images[i], images[i].name);
        }
        return this.http.post(`${this.apiController}`, formData);
    }

}
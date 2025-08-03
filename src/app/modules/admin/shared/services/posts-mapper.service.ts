import { Injectable } from "@angular/core";
import { PostInterface } from "src/app/shared/interfaces/PostInterfaces";
import { PostFormInterface } from "../models/PostFormInterface";

@Injectable({
    providedIn: 'root'
})

export class PostMapperService {
    constructor(){}

    mapFormToPost(postForm: PostFormInterface): PostInterface {
        return {
            title: postForm.title,
            description: postForm.text,
            author: postForm.author
        };
    }
}
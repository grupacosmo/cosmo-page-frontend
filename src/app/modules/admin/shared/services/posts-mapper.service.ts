import { Injectable } from "@angular/core";
import { PostInterface } from "src/app/shared/interfaces/PostInterfaces";
import { PostFormInterface } from "../models/PostFormInterface";
import { MapFormResult } from "../../components/postComponents/add-post/add-post.component";

@Injectable({
    providedIn: 'root'
})

export class PostMapperService {
    constructor(){}

    mapFormToPost(postForm: PostFormInterface, selectedFiles: FileList | undefined): MapFormResult {
        const postData: PostInterface = {
            title: postForm.title,
            description: postForm.text,
            author: postForm.author
        };

        const imageList: FileList | undefined = selectedFiles?.length ? selectedFiles : undefined;

        return {
            postData,
            imageList
        };
    }
}
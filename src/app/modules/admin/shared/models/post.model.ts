type Platform = {
    cosmo: boolean,
    fb: boolean
}

export class Post{
    constructor(
        public title: string, 
        public author: string, 
        public imgSrc: string, 
        public text: string,
        public platforms:  Platform,
    ){}
}
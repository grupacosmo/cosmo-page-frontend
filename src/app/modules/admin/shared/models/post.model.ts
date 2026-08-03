export class Post{
    constructor(
        public title: string,
        public imgSrc: string,
        public text: string,
        public id: string = '',
    ){}
}
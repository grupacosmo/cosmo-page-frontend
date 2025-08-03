export interface PostDetails {
    title?:string;
    id: string;
    description:string
    images: Image[]

    //not yet available
    date?: string;
}

export interface PostInterface {
    title: string;
    description: string;
    author: string;
}

export interface IPostsResponse {
  content: PostItem[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: any[];
  first: boolean;
  empty: boolean;
}

export interface PostItem {
  id: string;
  description: string;
  backgroundPhoto?: Image;
  title?: string;
  
  //to be added
  date?: string;
}

export interface Image {
  height: number;
  width: number;
  src: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: any[];
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export const POST_ERROR_RESPONSE = "INVALID_POST_DATA"
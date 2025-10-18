export interface Image {
  size: any;
  name: string;
  type: string;
  data: string;
}

export interface ImageUploaded {
  id: string;
  url: string;
}

export interface ImageEntity {
  id: string;
  name: string | null;
  type: string | null;
  data: string | null;
}

export interface ImageList {
    images: ImageEntity[];
}
interface Image {
  size: any;
  name: string;
  type: string;
  data: Blob;
}

interface ImageList {
    images: Image[];
}
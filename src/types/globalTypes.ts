export interface IBook {
  _id: number;
  title: string;
  image: string;
  author: string;
  genre: string;
  publicationDate: string;
  image_link: string;
}

export interface IError {
  data: {
    message: string;
  };
}

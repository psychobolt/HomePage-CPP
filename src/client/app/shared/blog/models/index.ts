export interface IComment {
  content: string;
  author: string;
  email: string;
}

export interface IPost {
  content: string;
  published_date: Date;
  updated_date: Date;
  comments: IComment[];
}
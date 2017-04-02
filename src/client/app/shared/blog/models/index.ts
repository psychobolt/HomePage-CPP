export interface IComment {
  content: string;
  author?: string;
  email?: string;
  published_date: number;
  updated_date?: number;
}

export interface IPost {
  title: string;
  content: string;
  published_date: number;
  updated_date: number;
  comments: IComment[];
}

import { DatabaseService } from './database.service';
import { BlogService } from './blog.service';

export const BLOG_PROVIDERS: any[] = [
  DatabaseService,
  BlogService
];

export * from './database.service';
export * from './blog.service';

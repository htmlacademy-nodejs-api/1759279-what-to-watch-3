import { User } from './user.type';

export type Comment = {
  text: string;
  userRating: number;
  dateComment: Date;
  author: User;
}

import { User } from './user.type';

export type Comment = {
  text: string;
  userRating: number;
  postDate: Date;
  User: User;
}

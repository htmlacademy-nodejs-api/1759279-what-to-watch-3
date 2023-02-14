import { User } from './user.type';

export type Comment = {
  textComment: string;
  userRating: number;
  dateComment: Date;
  authorComment: User;
}

import { User } from './user.type.js';
import { GenreType } from './genre.type.js';
import { Actors } from './actors.type.js';

export type Film = {
  title: string;
  description: string;
  filmDate: Date;
  genre: GenreType[];
  filmYear: number;
  rating: number;
  preview: string;
  video: string;
  actors: Actors[];
  director: string;
  filmLength: number;
  commentsCount: number;
  user: User;
  poster: string;
  backgroundImage: string;
  colorBackgroundImage: string;
}

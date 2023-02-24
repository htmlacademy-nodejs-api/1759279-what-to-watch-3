import { User } from './user.type.js';
import { GenreType } from './genre.type.js';

export type FilmType = {
  title: string;
  description: string;
  filmDate: Date;
  genre: GenreType[];
  filmYear: number;
  rating: number;
  preview: string;
  video: string;
  actors: string[];
  director: string;
  filmLength: number;
  commentsCount: number;
  user: User;
  poster: string;
  backgroundImage: string;
  colorBackgroundImage: string;
}

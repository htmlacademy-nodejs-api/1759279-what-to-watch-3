import { FilmType } from '../types/film.type.js';
import crypto from 'crypto';
import {plainToInstance} from 'class-transformer';
import {ClassConstructor} from 'class-transformer/types/interfaces/class-constructor.type.js';

export const createFilm = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');

  const [title, description, createdDate, genre, filmYear, rating, preview, video, actors, director, filmLength, commentsCount, email, avatarPath, firstname, lastname, poster,
    backgroundImage, colorBackgroundImage] = tokens;

  return {
    title,
    description,
    filmDate: new Date(createdDate),
    genre: genre.split(',')
      .map((genreType) => ({ genreType })),
    filmYear: Number.parseInt(filmYear, 10),
    rating: Number.parseInt(rating, 10),
    preview,
    video,
    actors: actors.split(',')
      .map((actorsName) => ({ actorsName })),
    director,
    filmLength: Number.parseInt(filmLength, 10),
    commentsCount: Number.parseInt(commentsCount, 10),
    user: { email, avatarPath, firstname, lastname },
    poster,
    backgroundImage,
    colorBackgroundImage,
  } as unknown as FilmType;
};

export const getErrorMessage = (error: unknown):
string => error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);

  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (message: string) => ({
  error: message,
});

import { Film } from '../types/film.type.js';


export const createFilm = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');

  const [title, description, createdDate, genre, filmYear, rating, preview, video, actors, director, filmLength, commentsCount, firstname, lastname, email, avatar, password, poster,
    backgroundImage, colorBackgroundImage] = tokens;

  return {
    title,
    description,
    filmDate: new Date(createdDate),
    genre: genre.split(',')
      .map((genreType) => ({genreType})),
    filmYear: Number.parseInt(filmYear, 10),
    rating: Number.parseInt(rating, 10),
    preview,
    video,
    actors: actors.split(',')
      .map((actorsName) => ({actorsName})),
    director,
    filmLength: Number.parseInt(filmLength, 10),
    commentsCount: Number.parseInt(commentsCount, 10),
    user: {firstname, lastname, email, avatar, password},
    poster,
    backgroundImage,
    colorBackgroundImage,
  } as Film;
};

export const getErrorMessage = (error: unknown):
string => error instanceof Error ? error.message : '';

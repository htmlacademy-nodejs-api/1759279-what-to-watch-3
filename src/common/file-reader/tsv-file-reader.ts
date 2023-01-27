import { readFileSync } from 'fs';
import { FileReaderInterface } from './file-reader.interface.js';
import { Film } from '../../types/film.type.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf8'});
  }

  public toArray(): Film[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([title, description, createdDate, genre, filmYear, rating, preview, video, actors, director, filmLength, commentsCount, name, email, avatar, password, poster,
        backgroundImage, colorBackgroundImage]) => ({
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
        user: {name, email, avatar, password},
        poster,
        backgroundImage,
        colorBackgroundImage,
      }));
  }
}

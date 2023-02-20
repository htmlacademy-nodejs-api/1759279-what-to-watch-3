export default class CreateWatchListFilmDto {
  filmId!: string;
  title!: string;
  filmDate!: Date;
  genre!: string[];
  preview!: string;
  commentsCount!: number;
  userId!: string;
  poster!: string;
}

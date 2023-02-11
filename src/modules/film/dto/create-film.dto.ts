export default class CreateFilmDto {
  title!: string;
  description!: string;
  filmDate!: Date;
  genre!: string[];
  filmYear!: number;
  rating!: number;
  preview!: string;
  video!: string;
  actors!: string[];
  director!: string;
  filmLength!: number;
  commentsCount!: number;
  userId!: string;
  poster!: string;
  backgroundImage!: string;
  colorBackgroundImage!: string;
}

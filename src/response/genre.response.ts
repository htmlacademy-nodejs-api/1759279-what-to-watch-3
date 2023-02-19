import {Expose} from 'class-transformer';

export default class GenreResponse {
  @Expose()
  public genreId!: string;

  @Expose()
  public genreType!: string;

  @Expose()
  public filmCount!: string;
}

import {Expose, Type} from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';
import GenreResponse from '../../../response/genre.response.js';

export default class FilmResponse {
  @Expose()
  public filmId!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public filmDate!: Date;

  @Expose()
  @Type(() => GenreResponse)
  public genre!: GenreResponse[];

  @Expose()
  public filmYear!: number;

  @Expose()
  public rating!: number;

  @Expose()
  public preview!: string;

  @Expose()
  public video!: string;

  @Expose()
  public actors!: string[];

  @Expose()
  public director!: string;

  @Expose()
  public filmLength!: number;

  @Expose()
  public commentsCount!: number;

  @Expose({name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public poster!: string;

  @Expose()
  public backgroundImage!: string;

  @Expose()
  public colorBackgroundImage!: string;
}

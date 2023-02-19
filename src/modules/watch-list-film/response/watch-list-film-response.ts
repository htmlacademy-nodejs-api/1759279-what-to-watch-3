import {Expose, Type} from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';
import GenreResponse from '../../../response/genre.response.js';

export default class WatchListFilmResponse {
  @Expose()
  public filmId!: string;

  @Expose()
  public title!: string;


  @Expose()
  public filmDate!: Date;

  @Expose()
  @Type(() => GenreResponse)
  public genre!: GenreResponse[];

  @Expose()
  public preview!: string;


  @Expose()
  public commentsCount!: number;

  @Expose({name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public poster!: string;
}

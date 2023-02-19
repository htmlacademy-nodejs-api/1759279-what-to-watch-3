import { GenreType } from '../../../types/genre.type.js';

export default class UpdateFilmDto {
  public filmId?: string;
  public title?: string;
  public description?: string;
  public filmDate?: Date;
  public genre?: GenreType[];
  public filmYear?: number;
  public rating?: number;
  public preview?: string;
  public video?: string;
  public actors?: string[];
  public director?: string;
  public filmLength?: number;
  public commentsCount?: number;
  public poster?: string;
  public backgroundImage?: string;
  public colorBackgroundImage?: string;
}

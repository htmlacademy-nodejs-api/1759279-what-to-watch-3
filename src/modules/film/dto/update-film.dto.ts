import { GenreType } from '../../../types/genre.type.js';
import { IsDateString, IsMongoId, IsOptional, MaxLength, MinLength, IsArray, IsInt } from 'class-validator';


export default class UpdateFilmDto {
  public filmId?: string;

  @IsOptional()
  @MinLength(2, {message: 'Minimum title length must be 2'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title?: string;

  @IsOptional()
  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public filmDate?: Date;

  @IsOptional()
  @IsArray({message: 'Field genres must be an array'})
  @IsMongoId({each: true, message: 'Genres field must be an array of valid id'})
  public genre?: GenreType[];

  @IsOptional()
  @IsInt({message: 'Film year must be an integer'})
  public filmYear?: number;

  @IsOptional()
  @IsInt({message: 'Rating must be an integer'})
  public rating?: number;

  @IsOptional()
  public preview?: string;

  @IsOptional()
  public video?: string;

  @IsOptional()
  @IsArray({message: 'Field actors must be an array'})
  public actors?: string[];

  @IsOptional()
  @MinLength(2, {message: 'Minimum title length must be 2'})
  @MaxLength(50, {message: 'Maximum title length must be 100'})
  public director?: string;

  @IsOptional()
  @IsInt({message: 'Film length must be an integer'})
  public filmLength?: number;

  @IsOptional()
  @IsInt({message: 'Comments count must be an integer'})
  public commentsCount?: number;

  @IsOptional()
  public poster?: string;

  @IsOptional()
  public backgroundImage?: string;

  @IsOptional()
  public colorBackgroundImage?: string;
}

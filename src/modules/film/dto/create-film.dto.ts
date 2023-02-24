import {IsArray, IsDateString, IsMongoId, MaxLength, MinLength, IsInt} from 'class-validator';

export default class CreateFilmDto {

  @MinLength(2, {message: 'Minimum title length must be 2'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title!: string;

  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description!: string;

  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public filmDate!: Date;

  @IsArray({message: 'Field genres must be an array'})
  @IsMongoId({each: true, message: 'Genres field must be an array of valid id'})
  public genre!: string[];

  @IsInt({message: 'Film year must be an integer'})
  public filmYear!: number;

  @IsInt({message: 'Rating must be an integer'})
  public rating!: number;

  public preview!: string;
  public video!: string;

  @IsArray({message: 'Field actors must be an array'})
  public actors!: string[];

  @MinLength(2, {message: 'Minimum title length must be 2'})
  @MaxLength(50, {message: 'Maximum title length must be 100'})
  public director!: string;

  @IsInt({message: 'Film length must be an integer'})
  public filmLength!: number;

  @IsInt({message: 'Comment count must be an integer'})
  public commentsCount!: number;

  @IsMongoId({message: 'userId field must be valid an id'})
  public userId!: string;

  public backgroundImage!: string;
  public colorBackgroundImage!: string;
}

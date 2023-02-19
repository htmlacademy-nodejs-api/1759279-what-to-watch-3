import {IsString} from 'class-validator';

export default class CreateGenreDto {
  @IsString({message: 'name is required'})
  public genreType!: string;
}

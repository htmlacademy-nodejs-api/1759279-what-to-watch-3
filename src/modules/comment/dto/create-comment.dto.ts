import {IsMongoId, IsString, Length} from 'class-validator';

export default class CreateCommentDto {

  @IsString({message: 'text is required'})
   @Length(5, 1024, {message: 'Min length is 5, max is 1024'})
  public text!: string;

  public rating!: string;

  @IsMongoId({message: 'filmId field must be a valid id'})
  public filmId!: string;

  @IsMongoId({message: 'userId field must be a valid id'})
  public userId!: string;
}

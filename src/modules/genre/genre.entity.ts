import {defaultClasses} from '@typegoose/typegoose';
import typegoose, {getModelForClass} from '@typegoose/typegoose';
import { GenreType } from '../../types/genre.type.js';

const {prop, modelOptions} = typegoose;

export interface GenreEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'genres'
  }
})

export class GenreEntity extends defaultClasses.TimeStamps implements GenreType {
  @prop({required: true, trim: true})
  public genreType!: string;
}

export const GenreModel = getModelForClass(GenreEntity);

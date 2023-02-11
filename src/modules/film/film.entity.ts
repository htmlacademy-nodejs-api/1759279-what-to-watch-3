import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { GenreEntity } from '../genre/genre.entity.js';


const {prop, modelOptions} = typegoose;

export interface FilmEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'films'
  }
})

export class FilmEntity extends defaultClasses.TimeStamps {

  @prop({trim: true, required: true})
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public filmDate!: Date;

  @prop({
    ref: GenreEntity,
    required: true,
    default: [],
    _id: false
  })
  public genre!: Ref<GenreEntity>[];

  @prop()
  public filmYear!: number;

  @prop()
  public rating!: number;

  @prop()
  public preview!: string;

  @prop()
  public video!: string;

  @prop({
    type: () => [String],
    default: [], })
  public actors!: string[];

  @prop()
  public director!: string;

  @prop()
  public filmLength!: number;

  @prop({default: 0})
  public commentsCount!: number;

  @prop({
    ref: UserEntity,
    required: true
  })
  public user: Ref<UserEntity>;

  @prop()
  public poster!: string;

  @prop()
  public backgroundImage!: string;

  @prop()
  public colorBackgroundImage!: string;

}


export const FilmModel = getModelForClass(FilmEntity);

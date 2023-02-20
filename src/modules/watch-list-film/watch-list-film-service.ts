import {inject, injectable} from 'inversify';
import CreateFilmDto from './dto/create-watch-list-film.dto.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { WatchListFilmEntity } from './watch-list-film.entity.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { WatchListFilmServiceInterface } from './watch-list-film-service.interface';
import { SortType } from '../../types/sort-type.enum.js';


@injectable()
export default class WatchListFilmService implements WatchListFilmServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.FilmModel) private readonly filmModel: types.ModelType<WatchListFilmEntity>,
  ) {}

  public async create(dto: CreateFilmDto): Promise<DocumentType<WatchListFilmEntity>> {
    const result = await this.filmModel.create(dto);
    this.logger.info(`New film created: ${dto.title}`);

    return result;
  }

  public async findById(filmId: string): Promise<DocumentType<WatchListFilmEntity> | null> {
    return this.filmModel
      .findById(filmId)
      .populate(['userId', 'genres'])
      .exec();
  }

  public async find(): Promise<DocumentType<WatchListFilmEntity>[]> {
    return this.filmModel
      .find()
      .populate(['userId', 'genres'])
      .exec();
  }

  public async deleteById(filmId: string): Promise<DocumentType<WatchListFilmEntity> | null> {
    return this.filmModel
      .findByIdAndDelete(filmId)
      .exec();
  }

  public async findNew(count: number): Promise<DocumentType<WatchListFilmEntity>[]> {
    return this.filmModel
      .find()
      .sort({createdAt: SortType.Down})
      .limit(count)
      .populate(['userId', 'genres'])
      .exec();
  }
}

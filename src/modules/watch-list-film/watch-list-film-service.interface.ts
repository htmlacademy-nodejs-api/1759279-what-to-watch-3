import { DocumentType } from '@typegoose/typegoose';
import { WatchListFilmEntity } from './watch-list-film.entity.js';
import CreateFilmDto from './dto/create-watch-list-film.dto.js';

export interface WatchListFilmServiceInterface {
  create(dto: CreateFilmDto): Promise<DocumentType<WatchListFilmEntity>>;
  findById(filmId: string): Promise<DocumentType<WatchListFilmEntity> | null>;
  find(filmId: string, count?: number): Promise<DocumentType<WatchListFilmEntity>[]>;
  deleteById(filmId: string): Promise<DocumentType<WatchListFilmEntity> | null>;
  findNew(count: number): Promise<DocumentType<WatchListFilmEntity>[]>;
}

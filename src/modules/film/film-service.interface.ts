import { DocumentType } from '@typegoose/typegoose';
import { FilmEntity } from './film.entity.js';
import CreateFilmDto from './dto/create-film.dto.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import { DocumentExistsInterface } from '../../types/document-exists.interface.js';
import { FilmPromoInterface } from '../../types/promo-film.interface.js';

export interface FilmServiceInterface extends DocumentExistsInterface, FilmPromoInterface {
  create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>>;
  findById(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  find(filmId?: string, count?: number): Promise<DocumentType<FilmEntity>[]>;
  deleteById(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  updateById(filmId: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null>;
  findByGenreId(GenreId: string, count?: number): Promise<DocumentType<FilmEntity>[]>;
  incCommentCount(filmId: string, userRating?: number): Promise<DocumentType<FilmEntity> | null>;
  findNew(count: number): Promise<DocumentType<FilmEntity>[]>;
  exists(documentId: string): Promise<boolean>;
  promo(filmId: string): Promise<boolean>;
}

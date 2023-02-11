import {Container} from 'inversify';
import {types} from '@typegoose/typegoose';
import {GenreEntity, GenreModel} from './genre.entity.js';
import {GenreServiceInterface} from './genre-service.interface.js';
import GenreService from './genre.service.js';
import {Component} from '../../types/component.types.js';

const genreContainer = new Container();

genreContainer.bind<GenreServiceInterface>(Component.GenreServiceInterface).to(GenreService);
genreContainer.bind<types.ModelType<GenreEntity>>(Component.GenreModel).toConstantValue(GenreModel);

export {genreContainer};

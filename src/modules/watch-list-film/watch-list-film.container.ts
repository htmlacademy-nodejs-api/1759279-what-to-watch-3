import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { WatchListFilmEntity, WatchListFilmModel } from './watch-list-film.entity.js';
import { WatchListFilmServiceInterface } from './watch-list-film-service.interface.js';
import { ControllerInterface } from '../../common/controller/controller.interface.js';
import WatchListFilmService from './watch-list-film-service.js';
import WatchListFilmController from './watch-list-film.controller.js';
import { Component } from '../../types/component.types.js';

const filmContainer = new Container();

filmContainer.bind<WatchListFilmServiceInterface>(Component.FilmServiceInterface).to(WatchListFilmService);
filmContainer.bind<types.ModelType<WatchListFilmEntity>>(Component.FilmModel).toConstantValue(WatchListFilmModel);
filmContainer.bind<ControllerInterface>(Component.FilmController).to(WatchListFilmController).inSingletonScope();

export {filmContainer};

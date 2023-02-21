import {Request, Response} from 'express';
import * as core from 'express-serve-static-core';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import { WatchListFilmServiceInterface } from './watch-list-film-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import WatchListFilmResponse from './response/watch-list-film-response.js';
import {fillDTO} from '../../utils/common.js';
import CreateFilmDto from './dto/create-watch-list-film.dto';
import HttpError from '../../common/errors/http-error.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import {PrivateRouteMiddleware} from '../../common/middlewares/private-route.middleware.js';

type ParamsGetFilm = {
  filmId: string;
}

@injectable()
export default class WatchListFilmController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.WatchListFilmServiceInterface) private readonly WatchListfilmService: WatchListFilmServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for FilmController…');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
      ]

    });
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
      ]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const films = await this.WatchListfilmService.find();
    this.ok(res, fillDTO(WatchListFilmResponse, films)); //TODO - добавить лимит на количество фильмов - 60
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDto>,
    res: Response): Promise<void> {
    const result = await this.WatchListfilmService.create(body);
    const film = await this.WatchListfilmService.findById(result.id);
    this.created(res, fillDTO(WatchListFilmResponse, film));
  }

  public async delete(
    {params}: Request<core.ParamsDictionary | ParamsGetFilm>,
    res: Response
  ): Promise<void> {
    const {filmId} = params;
    const film = await this.WatchListfilmService.deleteById(filmId);

    if (!film) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Film with id ${filmId} not found.`,
        'FilmController'
      );
    }

    this.noContent(res, film);
  }

}

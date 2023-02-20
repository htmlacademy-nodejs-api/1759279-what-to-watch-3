import {Request, Response} from 'express';
import * as core from 'express-serve-static-core';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import { FilmServiceInterface } from './film-service.interface.js';
import FilmResponse from './response/film.response.js';
import {fillDTO} from '../../utils/common.js';
import CreateFilmDto from './dto/create-film.dto.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import {CommentServiceInterface} from '../comment/comment-service.interface.js';
import CommentResponse from '../comment/response/comment.response.js';
import FilmPromoResponse from './response/film-promo.response.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import {DocumentExistsMiddleware} from '../../common/middlewares/document-exists.middleware.js';
import { FilmPromoMiddleware } from '../../common/middlewares/film-promo.middleware.js';
import {PrivateRouteMiddleware} from '../../common/middlewares/private-route.middleware.js';


type ParamsGetFilm = {
  filmId: string;
}

@injectable()
export default class FilmController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for FilmController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateFilmDto)
      ]
    });
    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });
    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });
    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
        new ValidateDtoMiddleware(UpdateFilmDto),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });
    this.addRoute({
      path: '/:filmsId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });

    this.addRoute({
      path: '/:filmId/promo',
      method: HttpMethod.Get,
      handler: this.showPromo,
      middlewares: [
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
        new FilmPromoMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const films = await this.filmService.find();
    this.ok(res, fillDTO(FilmResponse, films)); //TODO - добавить лимит на количество фильмов - 60
  }


  public async create(
    req: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDto>,
    res: Response): Promise<void> {
    const {body, user} = req;
    const result = await this.filmService.create({...body, userId: user.id});
    const film = await this.filmService.findById(result.id);
    this.created(res, fillDTO(FilmResponse, film));
  }

  public async show(
    {params}: Request<core.ParamsDictionary | ParamsGetFilm>,
    res: Response
  ): Promise<void> {
    const {filmId} = params;
    const film = await this.filmService.findById(filmId);

    this.ok(res, fillDTO(FilmResponse,film));
  }

  public async delete(
    {params}: Request<core.ParamsDictionary | ParamsGetFilm>,
    res: Response
  ): Promise<void> {
    const {filmId} = params;
    const film = await this.filmService.deleteById(filmId);

    await this.commentService.deleteByFilmId(filmId);

    this.noContent(res, film);
  }

  public async update(
    {body, params}: Request<core.ParamsDictionary | ParamsGetFilm, Record<string, unknown>, UpdateFilmDto>,
    res: Response
  ): Promise<void> {
    const updatedFilm = await this.filmService.updateById(params.filmId, body);

    this.ok(res, fillDTO(FilmResponse, updatedFilm));
  }

  public async showPromo(
    {params}: Request<core.ParamsDictionary | ParamsGetFilm>,
    res: Response
  ): Promise<void> {
    const {filmId} = params;
    const film = await this.filmService.findById(filmId);

    this.ok(res, fillDTO(FilmPromoResponse,film));
  } //TODO


  public async getComments(
    {params}: Request<core.ParamsDictionary | ParamsGetFilm, object, object>,
    res: Response
  ): Promise<void> {

    const comments = await this.commentService.findByFilmId(params.filmId);
    this.ok(res, fillDTO(CommentResponse, comments));
  }
}


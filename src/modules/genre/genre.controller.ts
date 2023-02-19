import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import { GenreServiceInterface } from './genre-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import GenreResponse from '../../response/genre.response.js';
import {fillDTO} from '../../utils/common.js';
import CreateGenreDto from './dto/create-genre.dto.js';
import HttpError from '../../common/errors/http-error.js';
import * as core from 'express-serve-static-core';
import { FilmServiceInterface } from '../film/film-service.interface.js';
import FilmResponse from '../film/response/film.response.js';
import { RequestQuery } from '../../types/request-query.type.js';

type ParamsGetGenre = {
  genreId: string;
}

@injectable()
export default class GenreController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.GenreServiceInterface) private readonly genreService: GenreServiceInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for GenreController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/:genreId/films', method: HttpMethod.Get, handler: this.getFilmsFromGenre});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const genres = await this.genreService.find();
    const genreResponse = fillDTO(GenreResponse, genres);
    this.send(res, StatusCodes.OK, genreResponse);
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateGenreDto>,
    res: Response): Promise<void> {

    const existGenre = await this.genreService.findByGenreName(body.genreType);

    if (existGenre) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Genre with name «${body.genreType}» exists.`,
        'GenreController'
      );
    }

    const result = await this.genreService.create(body);
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(GenreResponse, result)
    );
  }

  public async getFilmsFromGenre(
    {params, query}: Request<core.ParamsDictionary | ParamsGetGenre, unknown, unknown, RequestQuery>,
    res: Response
  ):Promise<void> {
    const films = await this.filmService.findByGenreId(params.genreId, query.limit);
    this.ok(res, fillDTO(FilmResponse, films));
  }
}

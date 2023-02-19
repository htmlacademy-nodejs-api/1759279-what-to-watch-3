import {Request, Response} from 'express';
import * as core from 'express-serve-static-core';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import { FilmServiceInterface } from './film-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import FilmResponse from './response/film.response.js';
import {fillDTO} from '../../utils/common.js';
import CreateFilmDto from './dto/create-film.dto';
import HttpError from '../../common/errors/http-error.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import FilmPromoResponse from './response/film-promo.response.js';

type ParamsGetFilm = {
  filmId: string;
}

@injectable()
export default class FilmController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for FilmController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/:filmId', method: HttpMethod.Get, handler: this.show});
    this.addRoute({path: '/:filmId', method: HttpMethod.Delete, handler: this.delete});
    this.addRoute({path: '/:filmId', method: HttpMethod.Patch, handler: this.update});
    // this.addRoute({path: '/towatch', method: HttpMethod.Get, handler: this.toWatchList});
    // this.addRoute({path: '/towatch', method: HttpMethod.Post, handler: this.createToWatchListFilm});
    // this.addRoute({path: '/towatch/:filmId', method: HttpMethod.Delete, handler: this.deleteToWatchListFilm});
    this.addRoute({path: '/promo/:filmId', method: HttpMethod.Get, handler: this.showPromo});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const films = await this.filmService.find();
    this.ok(res, fillDTO(FilmResponse, films)); //TODO - добавить лимит на количество фильмов - 60
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDto>,
    res: Response): Promise<void> {
    const result = await this.filmService.create(body);
    const film = await this.filmService.findById(result.id);
    this.created(res, fillDTO(FilmResponse, film));
  }

  public async show(
    {params}: Request<core.ParamsDictionary | ParamsGetFilm>,
    res: Response
  ): Promise<void> {
    const {filmId} = params;
    const film = await this.filmService.findById(filmId);

    if (!film){
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Film with id ${filmId} not found`,
        'FilmController'
      );
    }

    this.ok(res, fillDTO(FilmResponse,film));
  }

  public async delete(
    {params}: Request<core.ParamsDictionary | ParamsGetFilm>,
    res: Response
  ): Promise<void> {
    const {filmId} = params;
    const film = await this.filmService.deleteById(filmId);

    if (!film) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Film with id ${filmId} not found.`,
        'FilmController'
      );
    }

    this.noContent(res, film);
  }

  public async update(
    {body, params}: Request<core.ParamsDictionary | ParamsGetFilm, Record<string, unknown>, UpdateFilmDto>,
    res: Response
  ): Promise<void> {
    const updatedFilm = await this.filmService.updateById(params.filmId, body);

    if (!updatedFilm) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Film with id ${params.filmId} not found.`,
        'FilmController'
      );
    }

    this.ok(res, fillDTO(FilmResponse, updatedFilm));
  }

  // public async toWatchList(_req: Request, res: Response): Promise<void> {
  //   const films = await this.filmService.find();
  //   this.ok(res, fillDTO(FilmResponse, films));
  // } //TODO

  // public async createToWatchListFilm(
  //   {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDto>,
  //   res: Response): Promise<void> {
  //   const result = await this.filmService.create(body);
  //   const film = await this.filmService.findById(result.id);
  //   this.created(res, fillDTO(FilmResponse, film));
  // } //TODO

  // public async deleteToWatchListFilm(
  //   {params}: Request<core.ParamsDictionary | ParamsGetFilm>,
  //   res: Response
  // ): Promise<void> {
  //   const {filmId} = params;
  //   const film = await this.filmService.deleteById(filmId);

  //   if (!film) {
  //     throw new HttpError(
  //       StatusCodes.NOT_FOUND,
  //       `Film with id ${filmId} not found.`,
  //       'FilmController'
  //     );
  //   }

  //   this.noContent(res, film);
  // } //TODO


  public async showPromo(
    {params}: Request<core.ParamsDictionary | ParamsGetFilm>,
    res: Response
  ): Promise<void> {
    const {filmId} = params;
    const film = await this.filmService.findById(filmId);

    if (!film){
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Film with id ${filmId} not found`,
        'FilmController'
      );
    }

    this.ok(res, fillDTO(FilmPromoResponse,film));
  } //TODO
}


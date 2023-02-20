import {MiddlewareInterface} from '../../types/middleware.interface.js';
import {NextFunction, Request, Response} from 'express';
import { FilmPromoInterface } from '../../types/promo-film.interface.js';
import HttpError from '../errors/http-error.js';
import {StatusCodes} from 'http-status-codes';

export class FilmPromoMiddleware implements MiddlewareInterface {
  constructor(
    private readonly service: FilmPromoInterface,
    private readonly entityName: string,
    private readonly paramName: string,
  ) {}

  public async execute({params}: Request, _res: Response, next: NextFunction): Promise<void> {
    const filmId = params[this.paramName];
    if (!await this.service.promo(filmId)) {
      throw new HttpError(
        StatusCodes.BAD_GATEWAY,
        `${this.entityName} with ${filmId} is not a promo film.`,
        'DocumentExistsMiddleware'
      );
    }

    next();
  }
}

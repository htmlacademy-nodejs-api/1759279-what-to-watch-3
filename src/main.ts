import 'reflect-metadata';
import {Container} from 'inversify';
import Application from './app/application.js';
import { applicationContainer } from './app/application.container.js';
import { Component } from './types/component.types.js';
import { userContainer } from './modules/user/user.container.js';
import { genreContainer } from './modules/genre/genre.container.js';
import { filmContainer } from './modules/film/film.container.js';
import { commentContainer } from './modules/comment/comment.container.js';

const mainContainer = Container.merge(
  applicationContainer,
  userContainer,
  genreContainer,
  filmContainer,
  commentContainer,
);

async function bootstrap() {
  const application = mainContainer.get<Application>(Component.Application);
  await application.init();
}

bootstrap();

import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import localeEs from '@angular/common/locales/es'
import {registerLocaleData} from '@angular/common';
import { routes } from './app.routes';
import { ERROR_LEVEL } from './core/services/logger';
import { environment } from '../environments/environment';

registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: ERROR_LEVEL,
      useValue: environment.LOGGER_LEVEL,
    },
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }
  ],
};

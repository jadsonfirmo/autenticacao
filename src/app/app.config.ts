import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from 'app/app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { userReducer } from 'app/store/reducers/user.reducer';

// Sincroniza o estado com o localStorage ou sessionStorage
export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({
    keys: ['user', 'isAuthenticated'],
    rehydrate: true,
    storage: sessionStorage, //localStorage para armazenar os dados no localstorage
  })(reducer);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      user: localStorageSyncReducer(userReducer),
    }),
    provideEffects(),
  ],
};

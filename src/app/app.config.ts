import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { routes } from 'app/app.routes';
import { userReducer } from 'app/store/reducer/user.reducer';
import { provideEffects } from '@ngrx/effects';
import { localStorageSync } from 'ngrx-store-localstorage';

// Sincroniza o estado com o localStorage
export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({
    keys: ['user', 'isAuthenticated'],
    rehydrate: true,
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

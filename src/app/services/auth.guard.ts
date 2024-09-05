import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserState } from 'app/store/models/user-state.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<{ user: UserState }>,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select('user'),
      take(1),
      map((userState) => {
        console.log('CanActivate UserState Guard', userState);

        if (userState?.isAuthenticated) {
          // Usuário está autenticado
          return true;
        } else {
          // Redireciona para login
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}

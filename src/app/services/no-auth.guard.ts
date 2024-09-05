import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserState } from 'app/store/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private store: Store<{ user: UserState }>,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select('user'),
      take(1),
      map((userState) => {
        console.log('CanActivate UserState NoGuard', userState);

        if (userState?.isAuthenticated) {
          // Redireciona para home
          this.router.navigate(['/home']);
          return false;
        } else {
          // Usuário não está autenticado
          return true;
        }
      })
    );
  }
}

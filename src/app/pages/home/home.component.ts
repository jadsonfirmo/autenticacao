import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { LayoutComponent } from 'app/components/layout/layout.component';
import { logout } from 'app/store/actions/user.actions';
import { UserState } from 'app/store/models/user-state.model';
import { User } from 'app/store/models/user.model';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LayoutComponent, CommonModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  auth$: Observable<UserState | null>;
  user: User | null = null;

  constructor(
    private store: Store<{ user: UserState | null }>,
    private router: Router
  ) {
    this.auth$ = this.store.pipe(select('user'));
  }

  ngOnInit(): void {
    this.auth$.subscribe((authState) => {
      if (authState?.user) {
        this.user = authState.user;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  logout(): void {
    this.store.dispatch(logout()); // Despacha a ação de logout
    this.router.navigate(['/login']); // Redireciona para a página de login
  }
}

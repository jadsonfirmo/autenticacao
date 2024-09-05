import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LayoutComponent } from 'app/components/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { User } from 'app/store/models/user.model';
import { Store } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import { loginSuccess } from 'app/store/actions/user.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LayoutComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private store: Store, private router: Router) {}

  async signIn() {
    try {
      const userData: User = {
        username: this.username,
        email: this.username + '@email.com',
        token: 'mock-jwt-token',
      };

      this.store.dispatch(loginSuccess({ user: userData }));

      console.log('Login bem-sucedido!');

      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Erro de login:', error);
    }
  }
}

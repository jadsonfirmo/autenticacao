import { Routes } from '@angular/router';
import { LoginComponent } from 'app/pages/login/login.component';
import { CadastroComponent } from 'app/pages/cadastro/cadastro.component';
import { HomeComponent } from 'app/pages/home/home.component';
import { NoAuthGuard } from 'app/services/no-auth.guard';
import { AuthGuard } from 'app/services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];

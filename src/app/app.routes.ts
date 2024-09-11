import { Routes } from '@angular/router';
import { AuthGuard } from 'app/guards/auth.guard';
import { NoAuthGuard } from 'app/guards/no-auth.guard';
import { CadastroComponent } from 'app/pages/cadastro/cadastro.component';
import { HomeComponent } from 'app/pages/home/home.component';
import { LoginComponent } from 'app/pages/login/login.component';

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

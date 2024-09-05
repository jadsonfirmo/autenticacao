import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from 'app/components/layout/layout.component';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [LayoutComponent, RouterModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {}

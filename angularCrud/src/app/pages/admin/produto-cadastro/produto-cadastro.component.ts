import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminSidebarComponent } from '../../../shared/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-produto-cadastro',
  standalone: true,
  imports: [RouterLink, AdminSidebarComponent],
  host: { class: 'admin-page' },
  templateUrl: './produto-cadastro.component.html',
  styleUrl: './produto-cadastro.component.css',
})
export class ProdutoCadastroComponent {}

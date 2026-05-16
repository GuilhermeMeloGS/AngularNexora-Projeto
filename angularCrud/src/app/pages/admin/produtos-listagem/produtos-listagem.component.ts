import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminSidebarComponent } from '../../../shared/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-produtos-listagem',
  standalone: true,
  imports: [RouterLink, AdminSidebarComponent],
  host: { class: 'admin-page' },
  templateUrl: './produtos-listagem.component.html',
  styleUrl: './produtos-listagem.component.css',
})
export class ProdutosListagemComponent {}

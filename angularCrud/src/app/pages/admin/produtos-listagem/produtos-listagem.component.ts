import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdutoService, Produto } from '../../../services/produto.service';
import { AuthService } from '../../../services/autentificar.services';

@Component({
  selector: 'app-produtos-listagem',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './produtos-listagem.component.html',
  styleUrl: './produtos-listagem.component.css'
})
export class ProdutosListagemComponent implements OnInit {

  private service     = inject(ProdutoService);
  private authService = inject(AuthService);

  listaProdutos: Produto[] = [];
  isAdmin = false;

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.carregarDados();
  }

  carregarDados() {
    this.service.listar().subscribe({
      next: (dados) => {
        this.listaProdutos = dados;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        alert('Erro ao conectar com a API. O json-server está rodando?');
      }
    });
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja remover este produto?')) {
      this.service.excluir(id).subscribe(() => {
        this.carregarDados();
      });
    }
  }
}
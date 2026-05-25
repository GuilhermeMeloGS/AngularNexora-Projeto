import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdutoService, Produto } from '../../../services/produto.service';
import { AuthService } from '../../../services/autentificar.services';
import { CarrinhoService } from '../../../services/carrinho.service';

@Component({
  selector: 'app-produtos-listagem',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './produtos-listagem.component.html',
  styleUrl: './produtos-listagem.component.css'
})
export class ProdutosListagemComponent implements OnInit {

  private service         = inject(ProdutoService);
  private authService     = inject(AuthService);
  private carrinhoService = inject(CarrinhoService);

  listaProdutos: Produto[] = [];
  isAdmin = false;

  get quantidadeCarrinho() {
    return this.carrinhoService.getQuantidadeTotal();
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.carregarDados();
  }

  carregarDados() {
    this.service.listar().subscribe({
      next: (dados) => { this.listaProdutos = dados; },
      error: () => { alert('Erro ao conectar com a API. O json-server está rodando?'); }
    });
  }

  adicionarAoCarrinho(produto: Produto) {
    this.carrinhoService.adicionar(produto);
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja remover este produto?')) {
      this.service.excluir(id).subscribe(() => { this.carregarDados(); });
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdutoService, Produto } from '../../../services/produto.service';

@Component({
  selector: 'app-produtos-listagem',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './produtos-listagem.component.html',
  styleUrl: './produtos-listagem.component.css'
})
export class ProdutosListagemComponent implements OnInit {
  
  listaProdutos: Produto[] = [];

  constructor(private service: ProdutoService) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  // Busca a lista atualizada da API
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

  // Função para o botão excluir
  excluir(id: number) {
    if (confirm('Tem certeza que deseja remover este produto?')) {
      this.service.excluir(id).subscribe(() => {
        // Depois de excluir na API, recarrega a lista na tela
        this.carregarDados();
      });
    }
  }
}
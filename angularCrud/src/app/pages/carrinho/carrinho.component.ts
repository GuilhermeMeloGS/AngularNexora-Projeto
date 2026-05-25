import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';
import { AuthService } from '../../services/autentificar.services';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {

  private carrinhoService = inject(CarrinhoService);
  private authService = inject(AuthService);
  private router = inject(Router);

  itens = this.carrinhoService.getItens();
  pedidoFinalizado = false;

  ngOnInit(): void {
    this.itens = this.carrinhoService.getItens();
  }

  get total() {
    return this.carrinhoService.getTotal();
  }

  remover(id: string | number) {
    this.carrinhoService.remover(id);
  }

  diminuir(id: string | number) {
    this.carrinhoService.diminuir(id);
  }

  aumentar(produto: any) {
    this.carrinhoService.adicionar(produto);
  }

  finalizar() {
    const usuario = this.authService.getUsuario();
    const pedido = {
      usuarioId: usuario.id,
      usuarioNome: usuario.nome,
      itens: this.carrinhoService.getItens(),
      total: this.carrinhoService.getTotal(),
      data: new Date().toISOString(),
      status: 'pendente'
    };

    this.carrinhoService.finalizarPedido(pedido).subscribe(() => {
      this.carrinhoService.limpar();
      this.pedidoFinalizado = true;
    });
  }
}
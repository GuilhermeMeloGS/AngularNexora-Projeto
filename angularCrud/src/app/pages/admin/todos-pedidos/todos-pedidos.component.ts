import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarrinhoService, Pedido } from '../../../services/carrinho.service';

@Component({
  selector: 'app-todos-pedidos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './todos-pedidos.component.html',
  styleUrl: './todos-pedidos.component.css'
})
export class TodosPedidosComponent implements OnInit {
  private carrinhoService = inject(CarrinhoService);

  pedidos: Pedido[] = [];
  carregando = true;
  pedidoExpandido: string | number | null = null;

  get totalPedidos() { return this.pedidos.length; }
  get totalFaturado() { return this.pedidos.reduce((acc, p) => acc + p.total, 0); }
  get pedidosPendentes() { return this.pedidos.filter(p => p.status === 'pendente').length; }

  ngOnInit(): void {
    this.carrinhoService.listarPedidos().subscribe(pedidos => {
      this.pedidos = pedidos.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
      this.carregando = false;
    });
  }

  togglePedido(id: string | number | undefined): void {
    if (id === undefined) return;
    this.pedidoExpandido = this.pedidoExpandido === id ? null : id;
  }
}

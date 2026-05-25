import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarrinhoService, Pedido } from '../../services/carrinho.service';
import { AuthService } from '../../services/autentificar.services';

@Component({
  selector: 'app-meus-pedidos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './meus-pedidos.component.html',
  styleUrl: './meus-pedidos.component.css'
})
export class MeusPedidosComponent implements OnInit {
  private carrinhoService = inject(CarrinhoService);
  private authService = inject(AuthService);

  pedidos: Pedido[] = [];
  carregando = true;
  pedidoExpandido: string | number | null = null;

  ngOnInit(): void {
    const usuario = this.authService.getUsuario();
    this.carrinhoService.listarPedidos().subscribe(todos => {
      this.pedidos = todos
        .filter(p => String(p.usuarioId) === String(usuario.id))
        .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
      this.carregando = false;
    });
  }

  togglePedido(id: string | number | undefined): void {
    if (id === undefined) return;
    this.pedidoExpandido = this.pedidoExpandido === id ? null : id;
  }
}

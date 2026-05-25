import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CarrinhoService, Pedido } from '../../services/carrinho.service';
import { AuthService } from '../../services/autentificar.services';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {

  private carrinhoService = inject(CarrinhoService);
  private authService = inject(AuthService);
  private router = inject(Router);

  itens = this.carrinhoService.getItens();
  pedidoFinalizado = false;
  mostrarFormEndereco = false;
  pedidoRealizado: Pedido | null = null;

  endereco = {
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: ''
  };

  ngOnInit(): void {
    if (!this.authService.isLogado()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/carrinho' } });
      return;
    }
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

  irParaEndereco() {
    this.mostrarFormEndereco = true;
  }

  enderecoValido(): boolean {
    return !!(
      this.endereco.rua &&
      this.endereco.numero &&
      this.endereco.bairro &&
      this.endereco.cidade &&
      this.endereco.estado &&
      this.endereco.cep
    );
  }

  finalizar() {
    const usuario = this.authService.getUsuario();
    const itensPedido = [...this.carrinhoService.getItens()];
    const totalPedido = this.carrinhoService.getTotal();

    const pedido: Pedido = {
      usuarioId: usuario.id,
      usuarioNome: usuario.nome,
      itens: itensPedido,
      total: totalPedido,
      data: new Date().toISOString(),
      status: 'pendente',
      endereco: { ...this.endereco }
    };

    this.carrinhoService.finalizarPedido(pedido).subscribe((pedidoSalvo) => {
      this.pedidoRealizado = { ...pedido, id: pedidoSalvo.id };
      this.carrinhoService.limpar();
      this.pedidoFinalizado = true;
      this.mostrarFormEndereco = false;
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './produto.service';

export interface ItemCarrinho {
    produto: Produto;
    quantidade: number;
}

export interface Pedido {
    id?: string | number;
    usuarioId: string | number;
    usuarioNome: string;
    itens: ItemCarrinho[];
    total: number;
    data: string;
    status: string;
}

@Injectable({ providedIn: 'root' })
export class CarrinhoService {

    private apiUrl = 'http://localhost:3000/pedidos';
    private itens: ItemCarrinho[] = [];

    constructor(private http: HttpClient) { }

    adicionar(produto: Produto): void {
        const existente = this.itens.find(i => i.produto.id === produto.id);
        if (existente) {
            existente.quantidade++;
        } else {
            this.itens.push({ produto, quantidade: 1 });
        }
    }

    remover(produtoId: string | number): void {
        this.itens = this.itens.filter(i => i.produto.id !== produtoId);
    }

    diminuir(produtoId: string | number): void {
        const item = this.itens.find(i => i.produto.id === produtoId);
        if (item) {
            item.quantidade > 1 ? item.quantidade-- : this.remover(produtoId);
        }
    }

    getItens(): ItemCarrinho[] {
        return this.itens;
    }

    getTotal(): number {
        return this.itens.reduce((acc, i) => acc + i.produto.preco * i.quantidade, 0);
    }

    getQuantidadeTotal(): number {
        return this.itens.reduce((acc, i) => acc + i.quantidade, 0);
    }

    limpar(): void {
        this.itens = [];
    }

    finalizarPedido(pedido: Pedido): Observable<Pedido> {
        return this.http.post<Pedido>(this.apiUrl, pedido);
    }

    listarPedidos(): Observable<Pedido[]> {
        return this.http.get<Pedido[]>(this.apiUrl);
    }
}
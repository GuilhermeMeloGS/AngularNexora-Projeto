import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  salvarUsuario(usuario: any): void {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  getUsuario(): any {
    const dados = localStorage.getItem('usuario');
    return dados ? JSON.parse(dados) : null;
  }

  isLogado(): boolean {
    return this.getUsuario() !== null;
  }

  isAdmin(): boolean {
    const usuario = this.getUsuario();
    return usuario?.perfil === 'ADMIN';
  }

  sair(): void {
    localStorage.removeItem('usuario');
  }
}
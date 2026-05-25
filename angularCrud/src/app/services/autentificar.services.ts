import { Injectable } from '@angular/core';
import { Usuarios } from './cadastro-pessoa.service';
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/usuarios';
    constructor(private http: HttpClient) { }

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

  isUser(): boolean {
    const usuario = this.getUsuario();
    return usuario?.perfil === 'USER';
  }
autentificar(email: string, senha: string): Observable<Usuarios[]> {
  return this.http.get<Usuarios[]>(this.apiUrl).pipe(
    map(usuarios => {
      console.log('todos usuarios:', usuarios);
      const filtrado = usuarios.filter(usuario =>
        usuario.email.toLowerCase().trim() === email.toLowerCase().trim() &&
        usuario.senha === senha
      );
      console.log('filtrado:', filtrado);
      return filtrado;
    })
  );
}

  sair(): void {
    localStorage.removeItem('usuario');
  }
}
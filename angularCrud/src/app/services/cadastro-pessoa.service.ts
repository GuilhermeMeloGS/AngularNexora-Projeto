import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Usuarios {
  id?: number;
  nome: string;
  cpf: string;
  dataDeNascimento: string;
  senha: string;
  email: string;
  perfil: 'ADMIN' | 'USER';
}

@Injectable({
  providedIn: 'root'
})
export class CadastroPessoaService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }


  listar(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(this.apiUrl);
  }

  incluir(usuarios: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(this.apiUrl, usuarios);
  }

  excluir(id: number):Observable<Usuarios>{
    return this.http.delete<Usuarios>(this.apiUrl + `/${id}`)
  }

  buscarPorEmailESenha(email: string, senha: string): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.apiUrl}?email=${email}&senha=${senha}`);
  }
}

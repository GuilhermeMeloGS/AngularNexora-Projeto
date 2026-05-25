import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CadastroPessoaService, Usuarios } from '../../services/cadastro-pessoa.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  titulo: string = 'Cadastro de Pessoas';
  usuario: Usuarios = {
    nome: '',
    cpf: '',
    dataDeNascimento: '',
    senha: '',
    email: '',
    perfil: 'USER'
  };

  constructor(private service: CadastroPessoaService, private router: Router,
    private route: ActivatedRoute,) { }

cadastrar() {
  this.service.listar().subscribe(usuarios => {
    console.log('usuarios:', usuarios);
    const novoId = usuarios.length > 0 
      ? Math.max(...usuarios.map(u => Number(u.id) || 0)) + 1 
      : 1;
    console.log('novoId:', novoId);

    const usuarioComId = { ...this.usuario, id: novoId };
    console.log('usuarioComId:', usuarioComId);

    this.service.incluir(usuarioComId).subscribe(() => {
      this.router.navigate(['/']);
    });
  });
}
}


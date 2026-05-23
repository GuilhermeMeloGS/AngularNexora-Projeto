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
  usuario: Usuarios = {} as Usuarios;

  constructor(private service: CadastroPessoaService, private router: Router,
    private route: ActivatedRoute,) { }

  cadastrar() {
    this.service.incluir(this.usuario).subscribe(() => {
      this.router.navigate(['/usuarios'])
    })
  }
}


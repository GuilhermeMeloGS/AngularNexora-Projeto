import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Importado aqui
import { CadastroPessoaService, Usuarios } from '../../../services/cadastro-pessoa.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule], // <-- Adicionado aqui para liberar o *ngIf
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  listaUsuarios: Usuarios[] = []

  constructor(private service: CadastroPessoaService){}

  ngOnInit(): void {
    this.service.listar().subscribe((usuarios)=>{this.listaUsuarios = usuarios})
  }

  excluir(id: number){
    if (id){
      this.service.excluir(id).subscribe(()=>{
        window.location.reload()
      })
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProdutoService, Produto } from '../../../services/produto.service';

@Component({
  selector: 'app-produto-cadastro',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.css']
})
export class ProdutoCadastroComponent implements OnInit {

  produto: Produto = { nome: '', descricao: '', preco: 0 };
  idAlterar: number | null = null;

  constructor(
    private service: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.idAlterar = Number(id);
      this.service.buscarPorId(this.idAlterar).subscribe(dados => {
        this.produto = dados;
      });
    }
  }

  submeter() {
    if (this.idAlterar) {
      this.service.editar(this.idAlterar, this.produto).subscribe({
        next: () => {
          alert('Produto alterado com sucesso!');
          this.router.navigate(['/admin/produtos']);
        },
        error: (erro) => {
          console.error('Erro ao editar:', erro);
        }
      });
    } else {
      this.service.incluir(this.produto).subscribe({
        next: () => {
          alert('Produto cadastrado com sucesso!');
          this.router.navigate(['/admin/produtos']);
        },
        error: (erro) => {
          console.error('Erro ao cadastrar:', erro);
        }
      });
    }
  }
}
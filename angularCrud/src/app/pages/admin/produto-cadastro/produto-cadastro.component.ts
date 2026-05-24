import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProdutoService, Produto } from '../../../services/produto.service';
import { AuthService } from '../../../services/autentificar.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produto-cadastro',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.css']
})
export class ProdutoCadastroComponent implements OnInit {

  produto: Produto = { nome: '', descricao: '', preco: 0 };
  idAlterar: number | null = null;

  constructor(
    private service: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
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
          this.redirectAfterSave();
        },
        error: (erro) => {
          console.error('Erro ao editar:', erro);
          alert('Erro ao editar produto');
        }
      });
    } else {
      this.service.incluir(this.produto).subscribe({
        next: () => {
          alert('Produto cadastrado com sucesso!');
          this.redirectAfterSave();
        },
        error: (erro) => {
          console.error('Erro ao cadastrar:', erro);
          alert('Erro ao cadastrar produto');
        }
      });
    }
  }

  private redirectAfterSave() {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/admin/produtos']);
    } else {
      this.router.navigate(['/produtos']);
    }
  }
}
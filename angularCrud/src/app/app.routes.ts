import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { ProdutosListagemComponent } from './pages/admin/produtos-listagem/produtos-listagem.component';
import { ProdutoCadastroComponent } from './pages/admin/produto-cadastro/produto-cadastro.component';
import { UsuariosComponent } from './pages/admin/usuarios/usuarios.component';
import { AdministradorComponent } from './pages/admin/administrador/administrador.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, title: 'Nexora — Página inicial' },
  { path: 'login', component: LoginComponent, title: 'Nexora — Login' },
  { path: 'cadastrar', component: CadastroComponent, title: 'Nexora — Cadastro' },
  
  // Rotas para usuário comum (só pode adicionar)
  { path: 'produtos', component: ProdutosListagemComponent, title: 'Nexora — Produtos' },
  { path: 'produtos/cadastro', component: ProdutoCadastroComponent, title: 'Nexora — Cadastrar produto' },
  
  // Rotas para admin (pode adicionar, editar e excluir)
  { path: 'admin/produtos', component: ProdutosListagemComponent, title: 'Nexora Admin — Produtos' },
  { path: 'admin/produtos/cadastro', component: ProdutoCadastroComponent, title: 'Nexora Admin — Cadastrar produto' },
  { path: 'admin/produtos/editar/:id', component: ProdutoCadastroComponent, title: 'Nexora Admin — Editar produto' },
  { path: 'admin/usuarios', component: UsuariosComponent, title: 'Nexora Admin — Usuários' },
  { path: 'admin', component: AdministradorComponent, title: 'Nexora Admin — Página de Controle' }
];
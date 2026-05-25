import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { ProdutosListagemComponent } from './pages/admin/produtos-listagem/produtos-listagem.component';
import { ProdutoCadastroComponent } from './pages/admin/produto-cadastro/produto-cadastro.component';
import { UsuariosComponent } from './pages/admin/usuarios/usuarios.component';
import { AdministradorComponent } from './pages/admin/administrador/administrador.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { MeusPedidosComponent } from './pages/meus-pedidos/meus-pedidos.component';
import { TodosPedidosComponent } from './pages/admin/todos-pedidos/todos-pedidos.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, title: 'Nexora — Página inicial' },
  { path: 'login', component: LoginComponent, title: 'Nexora — Login' },
  { path: 'cadastrar', component: CadastroComponent, title: 'Nexora — Cadastro' },

  // Rotas para usuário comum (requer login)
  { path: 'produtos', component: ProdutosListagemComponent, title: 'Nexora — Produtos', canActivate: [authGuard] },
  { path: 'produtos/cadastro', component: ProdutoCadastroComponent, title: 'Nexora — Cadastrar produto', canActivate: [authGuard] },
  { path: 'carrinho', component: CarrinhoComponent, canActivate: [authGuard] },
  { path: 'meus-pedidos', component: MeusPedidosComponent, title: 'Nexora — Meus Pedidos', canActivate: [authGuard] },

  // Rotas para admin (pode adicionar, editar e excluir)
  { path: 'admin/produtos', component: ProdutosListagemComponent, title: 'Nexora Admin — Produtos', canActivate: [authGuard] },
  { path: 'admin/produtos/cadastro', component: ProdutoCadastroComponent, title: 'Nexora Admin — Cadastrar produto', canActivate: [authGuard] },
  { path: 'admin/produtos/editar/:id', component: ProdutoCadastroComponent, title: 'Nexora Admin — Editar produto', canActivate: [authGuard] },
  { path: 'admin/usuarios', component: UsuariosComponent, title: 'Nexora Admin — Usuários', canActivate: [authGuard] },
  { path: 'admin/pedidos', component: TodosPedidosComponent, title: 'Nexora Admin — Todos os Pedidos', canActivate: [authGuard] },
  { path: 'admin', component: AdministradorComponent, title: 'Nexora Admin — Página de Controle', canActivate: [authGuard] }
];
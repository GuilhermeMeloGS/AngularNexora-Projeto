import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { ProdutosListagemComponent } from './pages/admin/produtos-listagem/produtos-listagem.component';
import { ProdutoCadastroComponent } from './pages/admin/produto-cadastro/produto-cadastro.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, title: 'Nexora — Página inicial' },
  { path: 'login', component: LoginComponent, title: 'Nexora — Login' },
  { path: 'admin/produtos', component: ProdutosListagemComponent, title: 'Nexora Admin — Produtos' },
  { path: 'admin/produtos/cadastro', component: ProdutoCadastroComponent, title: 'Nexora Admin — Cadastrar produto' },
  { path: '**', redirectTo: '' },
];

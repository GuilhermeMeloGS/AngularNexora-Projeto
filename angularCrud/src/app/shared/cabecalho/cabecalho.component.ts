import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/autentificar.services';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent implements OnInit {

  private router      = inject(Router);
  private authService = inject(AuthService);

  isLogado = false;
  isAdmin  = false;

  ngOnInit() {
    // verifica na primeira carga
    this.verificarLogin();

    // verifica toda vez que mudar de página
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.verificarLogin();
      });
  }

  verificarLogin() {
    this.isLogado = this.authService.isLogado();
    this.isAdmin  = this.authService.isAdmin();
  }

  sair() {
    this.authService.sair();
    this.isLogado = false;
    this.isAdmin  = false;
    this.router.navigate(['/']);
  }
}
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/autentificar.services'; // <--- VERIFIQUE ESTE CAMINHO

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent implements OnInit {
  isLogado = false;
  isAdmin = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.atualizarEstadoLogin();
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.atualizarEstadoLogin();
    });
  }

  atualizarEstadoLogin() {
    this.isLogado = this.authService.isLogado();
    this.isAdmin = this.authService.isAdmin();
  }

  sair() {
    this.authService.sair();
    this.atualizarEstadoLogin();
    this.router.navigate(['/']);
  }
}
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CadastroPessoaService } from '../../services/cadastro-pessoa.service';
import { AuthService } from '../../services/autentificar.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  host: { class: 'login-page' },
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  private router      = inject(Router);
  private route       = inject(ActivatedRoute);
  private service     = inject(CadastroPessoaService);
  private authService = inject(AuthService);

  login: string = '';
  senha: string = '';
  erro:  string = '';

  clicarLogin(): void {
    this.authService.autentificar(this.login, this.senha).subscribe(usuarios => {
      if (usuarios.length > 0) {
        this.authService.salvarUsuario(usuarios[0]);

        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

        if (returnUrl) {
          this.router.navigateByUrl(returnUrl);
        } else if (this.authService.isAdmin()) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      } else {
        this.erro = 'E-mail ou senha incorretos.';
      }
    });
  }
}
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  host: { class: 'login-page' },
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  constructor(private router: Router) {}

  login: string = "";
  senha: string = "";

  clicarLogin(): void {


    if (this.login.trim() === "admin" && this.senha.trim() === "admin") {

      this.router.navigate(['/admin']);
    }
  }
}
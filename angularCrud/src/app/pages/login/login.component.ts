import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  host: { class: 'login-page' },
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}

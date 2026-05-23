import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // Adicione RouterModule
import { CabecalhoComponent } from "./shared/cabecalho/cabecalho.component";
import { RodapeComponent } from './shared/rodape/rodape.component';
// Não precisa importar a LandingPage aqui se ela for uma rota

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CabecalhoComponent, RodapeComponent], // Tire a LandingPage daqui
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularCrud';
}

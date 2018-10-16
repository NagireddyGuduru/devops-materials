import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Microservices Application Template';
  loginPalletteVisible = false;

  showLogin() {
    this.loginPalletteVisible = true;
  }
}

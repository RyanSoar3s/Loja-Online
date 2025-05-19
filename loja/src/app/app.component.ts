import { Component } from '@angular/core';
import { HeaderComponent } from '@components/header/header.component';
import { MainContentComponent } from '@components/main-content/main-content.component';
import { FooterComponent } from '@components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    MainContentComponent,
    FooterComponent

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'loja';
}

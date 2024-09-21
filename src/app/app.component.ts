import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'shell-app';

  constructor(private router: Router) {

  }

  reactApp() {
    this.router.navigate(['/react-app']);
  }

}

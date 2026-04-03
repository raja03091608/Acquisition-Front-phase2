import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './Components/toast/toast.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css',
  imports: [RouterOutlet,ToastComponent],
})
export class AppComponent {
  title = 'Hull-Insights-Angular';
}

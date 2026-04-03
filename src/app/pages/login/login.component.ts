import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Anchor, LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ToastComponent } from '../../Components/toast/toast.component';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, ToastComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  readonly AnchorIcon = Anchor;

  credentials = {
    username: '',
    password: '',
  };

  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private toastService: ToastService,
  ) { }




  async handleLogin() {
    if (this.loading) return;

    this.errorMessage = '';

    if (!this.credentials.username || !this.credentials.password) {
      this.errorMessage = 'Username and Password required';
      this.toastService.showError(this.errorMessage);
      return;
    }

    this.loading = true;

    try {
      const data = await this.authService.login(
        this.credentials.username,
        this.credentials.password
      );

      if (data?.access) {
        this.toastService.showSuccess('Login successful');

        localStorage.setItem('token', data.access);
        localStorage.setItem('user', JSON.stringify(data));

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      } else {
        this.errorMessage = 'Invalid login response';
      }

    } catch (err: any) {
      const msg =
        err?.error?.message ||
        err?.error?.detail ||
        'Invalid username or password';

      this.errorMessage = msg;
      this.toastService.showError(msg);
    }

    this.loading = false;
  }
}

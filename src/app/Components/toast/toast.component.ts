import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit {
  message = '';
  type: 'success' | 'error' = 'success';
  show = false;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toastState$.subscribe(({ message, type }) => {

       console.log('Toast Received:', message);

      this.message = message;
      this.type = type;
      this.show = true;

      setTimeout(() => {
        this.show = false;
      }, 3000);
    });
  }
}

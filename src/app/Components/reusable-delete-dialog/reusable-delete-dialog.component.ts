import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-reusable-delete-dialog',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './reusable-delete-dialog.component.html',
  styleUrls: ['./reusable-delete-dialog.component.css'],
})
export class ReusableDeleteDialogComponent {
  @Input() open: boolean = false;
  @Input() id: number | string | null = null;
  @Input() name: string = '';
  @Input() entityType: string = 'record';
  @Input() loading: boolean = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit() {
    this.confirm.emit(); // ✅ only emit
  }

  onCancel() {
    this.cancel.emit();
  }
}

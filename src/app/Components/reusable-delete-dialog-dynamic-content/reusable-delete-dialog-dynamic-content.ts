import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reusable-delete-dialog-dynamic-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reusable-delete-dialog-dynamic-content.html',
})
export class ReusableDeleteDialogDynamicContent {
  @Input() open = false;
  @Input() title = 'Confirm Delete';
  @Input() message = 'Are you sure you want to delete?';

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }
}

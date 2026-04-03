import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.css'],
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  fileName: string = 'No file chosen';

  @Output() fileSelected = new EventEmitter<File | null>();

  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
      this.fileSelected.emit(file);
    }
  }

  removeFile() {
    this.selectedFile = null;
    this.fileName = 'No file chosen';
    this.fileSelected.emit(null);
  }
}

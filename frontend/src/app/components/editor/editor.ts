import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editor.html',
  styleUrl: './editor.css'
})
export class EditorComponent {
  pages = [
    { id: 'page4', label: '4', rotated: true, preview: null },
    { id: 'page3', label: '3', rotated: true, preview: null },
    { id: 'page2', label: '2', rotated: true, preview: null },
    { id: 'page1', label: '1', rotated: true, preview: null },
    { id: 'page5', label: '5', rotated: false, preview: null },
    { id: 'page6', label: '6', rotated: false, preview: null },
    { id: 'page_back', label: 'Back', rotated: false, preview: null },
    { id: 'page_cover', label: 'Cover', rotated: false, preview: null },
  ];

  triggerUpload(index: number) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.pages[index].preview = e.target.result;
          // In a real app, we would upload to backend here
          // For Phase 1, we'll just show the preview
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss'
})
export class CodeComponent {
  editorContent: string = '';
  lineNumbers: string = '1';

  updateLineNumbers(event: Event) {
    const lines = this.editorContent.split('\n').length;
    this.lineNumbers = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
    this.syncScroll(event);
  }

  syncScroll(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    const lineNumbers = document.querySelector('.line-numbers') as HTMLElement;
    if (lineNumbers) lineNumbers.scrollTop = textarea.scrollTop;
  }
}

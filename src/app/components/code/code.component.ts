import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SyncService } from '../../services/sync.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss'
})
export class CodeComponent implements OnInit {
  code: string = '';
  lineNumbers: string = '1';

  constructor(
    private syncService: SyncService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.syncService.getCode().subscribe(code => {
      this.code = code;
      this.updateLineNumbers();
    });
  }

  updateLineNumbers(event?: Event) {
    const lines = this.code.split('\n').length;
    this.lineNumbers = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
    if (event) this.syncScroll(event);
  }

  syncScroll(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    const lineNumbers = document.querySelector('.line-numbers') as HTMLElement;
    if (lineNumbers) lineNumbers.scrollTop = textarea.scrollTop;
  }

  runCode() {
    this.snackbarService.open('Execution of the code is not yet implemented!');
  }

  stopExecution() {
    this.snackbarService.open('Execution of the code is not yet implemented!');
  }

  async copyCode() {
    try {
      await navigator.clipboard.writeText(this.code);
      this.snackbarService.open('Code copied to clipboard!');
    } catch (err) {
      this.snackbarService.open('Failed to copy code to clipboard!');
    }
  }

  clearEditor() {
    this.syncService.setCode('');
  }

  downloadCode() {
    const blob = new Blob([this.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.sqz';
    a.click();
  }

}

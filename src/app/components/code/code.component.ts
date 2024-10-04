import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SyncService } from '../../services/sync.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss'
})
export class CodeComponent implements OnInit, OnDestroy {
  lineNumbers: string = '1';
  code: string = '';
  tabSize: number = 2;
  codeSubscription: Subscription = new Subscription();
  tabSizeSubscription: Subscription = new Subscription();

  constructor(
    private syncService: SyncService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.codeSubscription = this.syncService.getCode().subscribe(code => {
      this.code = code;
      this.updateLineNumbers();
    });
    this.tabSizeSubscription = this.syncService.getTabSize().subscribe(tabSize => this.tabSize = tabSize);
  }

  ngOnDestroy(): void {
    this.codeSubscription?.unsubscribe();
    this.tabSizeSubscription?.unsubscribe();
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

  handleTab(event: KeyboardEvent): void {
    const textarea = event.target as HTMLTextAreaElement;
    if (event.key === 'Tab') {
      event.preventDefault();
      textarea.value = textarea.value.substring(0, textarea.selectionStart) + ' '.repeat(this.tabSize) + textarea.value.substring(textarea.selectionEnd);
      textarea.selectionStart = textarea.selectionEnd = textarea.selectionStart + 1;
    }
  }

  runCode() {
    this.snackbarService.open('Execution of the code is not yet implemented!');
  }

  stopExecution() {
    this.snackbarService.open('Execution of the code is not yet implemented!');
  }

  async copyCode() {
    const textarea = document.createElement('textarea');
    textarea.value = this.code;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.zIndex = '-1';
    document.body.appendChild(textarea);
    setTimeout(() => {
      textarea.select();
      try {
        if (!document.execCommand('copy')) {
          this.snackbarService.open('Failed to copy code to clipboard!');
        } else {
          this.snackbarService.open('Code copied to clipboard!');
        }
      } catch (err) {
        this.snackbarService.open('Failed to copy code to clipboard!');
      } finally {
        document.body.removeChild(textarea);
      }
    }, 0);
  }
  

  clearEditor() {
    this.syncService.setCode('');
  }

  downloadCode() {
    const blob = new Blob([this.code]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.sqz';
    a.click();
  }

}

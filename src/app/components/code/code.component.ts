import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SyncService } from '../../services/sync.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

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
  fontSize: number = 16;
  tabSize: number = 2;
  codeSubscription: Subscription = new Subscription();
  fontSizeSubscription: Subscription = new Subscription();
  tabSizeSubscription: Subscription = new Subscription();

  constructor(
    private syncService: SyncService,
    private snackbarService: SnackbarService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.codeSubscription = this.syncService.getCode().subscribe(code => {
      this.code = code;
      this.updateLineNumbers();
    });
    this.fontSizeSubscription = this.syncService.getFontSize().subscribe(fontSize => this.fontSize = fontSize);
    this.tabSizeSubscription = this.syncService.getTabSize().subscribe(tabSize => this.tabSize = tabSize);
  }

  ngOnDestroy(): void {
    this.codeSubscription?.unsubscribe();
    this.fontSizeSubscription?.unsubscribe();
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
    this.api.interpretCode(this.code).then((response: any) => {
      let output = '';
      response.result.forEach((line: any) => {
        switch (line.type) {
          case 'LOG':
            output += '<span>' + line.value + '</span><br>';
            break;
          case 'ERROR':
            output += '<span style="color: red">' + line.value + '</span><br>';
            break;
          case 'WARN':
            output += '<span style="color: yellow">' + line.value + '</span><br>';
            break;
          case 'COLORED':
            output += '<span style="color: ' + line.color + '">' + line.value + '</span><br>';
            break;
        }
      });
      this.syncService.setOutput(output);
    }).catch((error: any) => {
      this.snackbarService.open('Error: ' + error.message);
    });
  }

  stopExecution() {
    this.snackbarService.open('Execution of the code is not yet implemented!');
  }

  async copyCode() {
    if (this.code === '') {
      this.snackbarService.open('No code to copy!');
      return;
    }
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

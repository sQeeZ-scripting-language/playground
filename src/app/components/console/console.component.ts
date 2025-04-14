import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SyncService } from '../../services/sync.service';
import { Subscription } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-console',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './console.component.html',
  styleUrl: './console.component.scss'
})
export class ConsoleComponent implements OnInit, OnDestroy {
  output: SafeHtml = '';
  outputSubscription: Subscription = new Subscription();

  constructor(private syncService: SyncService, private sanitizer: DomSanitizer) { }
  
  ngOnInit(): void {
    this.outputSubscription = this.syncService.getOutput().subscribe(output => this.output = this.sanitizer.bypassSecurityTrustHtml(output));
  }

  ngOnDestroy(): void {
    this.outputSubscription?.unsubscribe();
  }

  clearConsole() {
    this.syncService.setOutput('');
  }

}

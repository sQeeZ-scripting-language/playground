import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  public currentTheme: string = 'dark';

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private snackBar: SnackbarService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentTheme = this.getSystemTheme();
    this.setTheme();
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme();
  }

  openDocumentation(): void {
    this.snackBar.open('Documentation coming soon!');
  }

  openSettings(): void {
		this.dialog.open(SettingsComponent);
  }

  private getSystemTheme(): string {
    return (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }

  private setTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.toggle('dark-theme', this.currentTheme === 'dark');
      document.body.classList.toggle('light-theme', this.currentTheme === 'light');
    }
  }
}

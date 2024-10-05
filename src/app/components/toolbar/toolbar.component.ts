import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { SettingsComponent } from '../settings/settings.component';
import { TemplatesComponent } from '../templates/templates.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SyncService } from '../../services/sync.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @Input() public screenWidth: number = 0;
  public currentTheme: string = 'dark';

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private syncService: SyncService,
    private snackBar: SnackbarService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.currentTheme = this.getSystemTheme();
    this.setTheme();
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    try { 
      this.screenWidth = window.innerWidth;
      this.cdr.detectChanges();
    } catch (err) { }
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.syncService.setTheme(this.currentTheme);
    this.setTheme();
  }

  openDocumentation(): void {
    this.snackBar.open('Documentation coming soon!');
  }

  openSettings(): void {
		this.dialog.open(SettingsComponent);
  }

  openMenu(): void {
    this.dialog.open(TemplatesComponent, {
      width: '90%'
    });
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

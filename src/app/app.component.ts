import { ChangeDetectorRef, Component, Inject, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { DataService } from './services/data.service';
import { SyncService } from './services/sync.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionPanel, MatExpansionPanelTitle, MatExpansionPanelHeader } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TemplateCategory } from './interfaces/template-category.interface';
import { MediaMatcher } from '@angular/cdk/layout';
import { SnackbarService } from './services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { SettingsComponent } from './components/settings/settings.component';
import { lastValueFrom } from 'rxjs';
import { Template } from './interfaces/template.interface';
import { CodeComponent } from './components/code/code.component';
import { ConsoleComponent } from './components/console/console.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MatTooltipModule, MatMenuModule, MatExpansionPanel, MatExpansionPanelTitle, MatExpansionPanelHeader, CodeComponent, ConsoleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'playground';
  public mobileQuery!: MediaQueryList;
  public currentTheme: string = 'dark';
  categories: TemplateCategory[] = [];
    
  private _mobileQueryListener: () => void;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private dataService: DataService,
    private syncService: SyncService,
    private snackBar: SnackbarService,
    private dialog: MatDialog,
  ) {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.currentTheme = this.getSystemTheme();
    this.setTheme();
    this.categories = this.dataService.templates;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.syncService.setTheme(this.currentTheme);
    this.setTheme();
  }

  openDocumentation(): void {
    window.location.href = 'https://sqeez-scripting-language.github.io/documentation/';
  }

  openSettings(): void {
		this.dialog.open(SettingsComponent);
  }

  async showCode(template: Template) {
    this.syncService.setCode(await lastValueFrom(this.dataService.getTemplateCode(template.code)));
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SyncService } from '../../services/sync.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatLabel, MatInputModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit, OnDestroy {
  settingsForm: FormGroup;
  theme: string = 'dark';
  fontSizeSubscription: Subscription = new Subscription();
  tabSizeSubscription: Subscription = new Subscription();
  themeSubscription: Subscription = new Subscription();

  constructor(
    private _dialogRef: MatDialogRef<SettingsComponent>, 
    private fb: FormBuilder, 
    private syncService: SyncService,
    private snackbarService: SnackbarService
  ) {
    this.settingsForm = this.fb.group({
      fontSize: [0, [Validators.required, Validators.min(8), Validators.max(72)]],
      tabSize: [0, [Validators.required, Validators.min(1), Validators.max(8)]]
    });
  }

  ngOnInit(): void {
    this.fontSizeSubscription = this.syncService.getFontSize().subscribe(fontSize => this.settingsForm.patchValue({ fontSize }));
    this.tabSizeSubscription = this.syncService.getTabSize().subscribe(tabSize => this.settingsForm.patchValue({ tabSize }));
    this.themeSubscription = this.syncService.getTheme().subscribe(theme => this.theme = theme);
  }

  ngOnDestroy(): void {
    this.fontSizeSubscription?.unsubscribe();
    this.tabSizeSubscription?.unsubscribe();
    this.themeSubscription?.unsubscribe();
  }

	public closeDialog(res: boolean): void {
		this._dialogRef.close(res);
	}

  onSave(): void {
    if (this.settingsForm.valid) {
      this.syncService.setFontSize(this.settingsForm.value.fontSize);
      this.syncService.setTabSize(this.settingsForm.value.tabSize);
    }
    this.snackbarService.open('Settings saved successfully');
    this.closeDialog(true);
  }
}

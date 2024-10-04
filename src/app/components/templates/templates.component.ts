import {AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, Optional, signal, ViewEncapsulation} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../../services/data.service';
import { TemplateCategory } from '../../interfaces/template-category.interface';
import { Template } from '../../interfaces/template.interface';
import { SyncService } from '../../services/sync.service';
import { lastValueFrom } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [MatExpansionModule, MatButtonModule, MatIconModule, NgClass],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss'
})
export class TemplatesComponent implements OnInit, AfterViewInit {
  @Input() screenWidth: number = 0;
  isCollapsed: boolean = false;

  constructor(
    private dataService: DataService,
    private syncService: SyncService,
    @Optional() private dialogRef: MatDialogRef<TemplatesComponent>
  ) { }

  readonly panelOpenState = signal(false);
  categories: TemplateCategory[] = [];

  ngOnInit() {
    this.categories = this.dataService.templates;
  }

  ngAfterViewInit(): void {
    try {
      this.screenWidth = window.innerWidth;
    } catch (err) { }
  }

  async showCode(template: Template) {
    this.syncService.setCode(await lastValueFrom(this.dataService.getTemplateCode(template.code)));
    this.dialogRef?.close();
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

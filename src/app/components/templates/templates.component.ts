import {ChangeDetectionStrategy, Component, signal, ViewEncapsulation} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../../services/data.service';
import { TemplateCategory } from '../../interfaces/template-category.interface';
import { Template } from '../../interfaces/template.interface';
import { SyncService } from '../../services/sync.service';
import { lastValueFrom } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [MatExpansionModule, MatButtonModule, MatIconModule, NgClass],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss'
})
export class TemplatesComponent {
  isCollapsed: boolean = false;

  constructor(
    private dataService: DataService,
    private syncService: SyncService
  ) { }

  readonly panelOpenState = signal(false);
  categories: TemplateCategory[] = [];

  ngOnInit() {
    this.categories = this.dataService.templates;
  }

  async showCode(template: Template) {
    this.syncService.setCode(await lastValueFrom(this.dataService.getTemplateCode(template.code)));
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}

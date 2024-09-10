import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../../services/data.service';
import { TemplateCategory } from '../../interfaces/template-category.interface';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [MatExpansionModule, MatButtonModule],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatesComponent {

  constructor(private dataService: DataService) { }

  readonly panelOpenState = signal(false);
  categories: TemplateCategory[] = [];

  ngOnInit() {
    this.categories = this.dataService.templates;
  }
}

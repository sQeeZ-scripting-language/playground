import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  public currentTheme: 'light' | 'dark' = 'light';

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
  }

}

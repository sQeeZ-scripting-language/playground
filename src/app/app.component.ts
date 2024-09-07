import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { CodeComponent } from './components/code/code.component';
import { ConsoleComponent } from './components/console/console.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, TemplatesComponent, CodeComponent, ConsoleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'playground';
}

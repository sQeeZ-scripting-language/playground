import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  private code = new BehaviorSubject('// This is a simple "Hello World" program in sQeeZ \n\n// Basic log message\nlog("Hello, World!");\n\n// Warning message\nwarn("This is a warning message!");\n\n// Error message\nerror("This is an error message!");\n\n// Colored log message\nlogc("Custom colored message!", #7F00FF);\n');
  private output = new BehaviorSubject('');
  private fontSize = new BehaviorSubject(16);
  private tabSize = new BehaviorSubject(2);
  private theme = new BehaviorSubject('dark');

  constructor() { }

  public setCode(code: string) {
    this.code.next(code);
  }

  public setOutput(output: string) {
    this.output.next(output.replace(/\n/g, '<br>'));
  }

  public setFontSize(fontSize: number) {
    this.fontSize.next(fontSize);
  }

  public setTabSize(tabSize: number) {
    this.tabSize.next(tabSize);
  }

  public setTheme(theme: string) {
    this.theme.next(theme);
  }

  public getCode(): Observable<string> {
    return this.code.asObservable();
  }

  public getOutput(): Observable<string> {
    return this.output.asObservable();
  }

  public getFontSize(): Observable<number> {
    return this.fontSize.asObservable();
  }

  public getTabSize(): Observable<number> {
    return this.tabSize.asObservable();
  }

  public getTheme(): Observable<string> {
    return this.theme.asObservable();
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  private code = new BehaviorSubject('// This is a simple "Hello World" program in sQeeZ\nlog("Hello, World!");\n');
  private output = new BehaviorSubject('');
  private tabSize = new BehaviorSubject(2);

  constructor() { }

  public setCode(code: string) {
    this.code.next(code);
  }

  public setOutput(output: string) {
    this.output.next(output.replace(/\n/g, '<br>'));
  }

  public setTabSize(tabSize: number) {
    this.tabSize.next(tabSize);
  }

  public getCode(): Observable<string> {
    return this.code.asObservable();
  }

  public getOutput(): Observable<string> {
    return this.output.asObservable();
  }

  public getTabSize(): Observable<number> {
    return this.tabSize.asObservable();
  }
}

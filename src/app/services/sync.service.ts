import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  private code = new BehaviorSubject('// This is a simple "Hello World" program in sQeeZ\nlog("Hello, World!");\n');

  constructor() { }

  public setCode(code: string) {
    this.code.next(code);
  }

  public getCode(): Observable<string> {
    return this.code.asObservable();
  }
}

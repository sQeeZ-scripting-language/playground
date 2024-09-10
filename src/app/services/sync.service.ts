import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  private code = new BehaviorSubject('log("Hello World!");');

  constructor() { }

  public setCode(code: string) {
    this.code.next(code);
  }

  public getCode(): Observable<string> {
    return this.code.asObservable();
  }
}

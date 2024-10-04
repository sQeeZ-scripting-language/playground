import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TemplateCategory } from '../interfaces/template-category.interface';
import * as templatesData from '../../../public/templates/overview.json';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private http: HttpClient) {}

  public get templates(): TemplateCategory[] {
    return templatesData.categories;
  }

  public getTemplateCode(path: string): Observable<string> {
    return this.http.get<string>(path, {responseType: 'text' as 'json'});
  }

}
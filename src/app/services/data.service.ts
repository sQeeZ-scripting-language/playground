import { Injectable } from '@angular/core';
import { TemplateCategory } from '../interfaces/template-category.interface';
import * as templatesData from '../../../public/templates/overview.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public get templates(): TemplateCategory[] {
    return templatesData.categories;
  }

}
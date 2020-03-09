import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'

import { ErrorHandler } from '../app.error-handler';
import { Category } from './category.model';
import { TASKS_API } from '../app.api';

@Injectable()
export class CategoriesService {

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(`${TASKS_API}/categories`)
    .catch(ErrorHandler.handleError)
  }

  postCategories(categories) {
    return this.http.post<Category[]>(`${TASKS_API}/categories`, categories)
    .catch(ErrorHandler.handleError)
  }
}
import { Observable }from 'rxjs';
import { ApiResponse } from '../../models/http.types';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../http/environment';
import { Category, UpdateCategory } from '../../models/category.model';
import { CategoryStatus } from '../../models/category-status.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  public getCategories(): Observable<ApiResponse<Category[]>> {
    return this.http.get<ApiResponse<Category[]>>(environment.apiURL + '/categories', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public getCategory(id: number): Observable<ApiResponse<Category>> {
    return this.http.get<ApiResponse<Category>>(environment.apiURL + '/categories/' + id, {
      headers: { 
        'Content-Type': 'application/json'
      }
    });
  }

  public updateCategory(id: number, data: UpdateCategory): Observable<ApiResponse<Category>> {
    return this.http.put<ApiResponse<Category>>(environment.apiURL + '/categories/' + id, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  public createCategory(data: UpdateCategory): Observable<ApiResponse<Category>> {
    return this.http.post<ApiResponse<Category>>(environment.apiURL + '/categories', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public getCategoryStatuses(): Observable<ApiResponse<CategoryStatus[]>> {
      return this.http.get<ApiResponse<CategoryStatus[]>>(environment.apiURL + '/category-status', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } 
}
  
import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { ApiResponse } from '../../services/http/http.types';
import { FilterProductDTO, InsertUpdateProductDTO } from './product.dto';
import { Product } from './product.model';
import { environment } from '../../environments/environment';
import { filter, Observable } from 'rxjs';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class ProductApi {
  private readonly _api: string;

  constructor(
    private httpService: HttpService
  ) {
    this._api = 'products';
  }

  public list(): Observable<ApiResponse> {
    return this.httpService.get<ApiResponse>(this._api);
  }
}

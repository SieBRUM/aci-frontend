import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddProductObject } from './models/add-product.model';
import { ICategory } from './models/category.model';
import { IReservation } from './models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_GATEWAY = 'https://localhost:44372/api/';

  constructor(private http: HttpClient) { }

  /* GET calls */
  getAllCategories(): Observable<HttpResponse<Array<ICategory>>> {
    return this.http.get<Array<ICategory>>(`${this.API_GATEWAY}category`, { observe: 'response' });
  }

  getLastCatalogNumber(): Observable<HttpResponse<number>> {
    return this.http.get<number>(`${this.API_GATEWAY}product/lastcatalog`, { observe: 'response' });
  }

  getReservationsByProductId(productId: number): Observable<HttpResponse<Array<IReservation>>> {
    return this.http.get<Array<IReservation>>(`${this.API_GATEWAY}reservation/${productId}`, { observe: 'response' });
  }

  /* POST calls */
  addProduct(product: IAddProductObject): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.API_GATEWAY}product`, product, { observe: 'response' });
  }
}

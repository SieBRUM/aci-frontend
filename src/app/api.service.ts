import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddCategoryObject } from './models/add-category.model';
import { IAddProductObject } from './models/add-product.model';
import { IAddReservation } from './models/add-reservation.model';
import { ICategory } from './models/category.model';
import { IProductFlat } from './models/product-flat.model';
import { IReservation } from './models/reservation.model';
import { InventoryPage } from './models/InventoryPage.model';

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

  getProductFlatById(productId: number): Observable<HttpResponse<IProductFlat>> {
    return this.http.get<IProductFlat>(`${this.API_GATEWAY}product/flat/${productId}`, { observe: 'response' });
  }

  getInventoryProducts(pageNumber: number, pageSize: number): Observable<HttpResponse<InventoryPage>> {
    return this.http.get<InventoryPage>(`${this.API_GATEWAY}product/page/${pageNumber}/${pageSize}`, { observe: 'response' });
  }

  /* POST calls */
  addProduct(product: IAddProductObject): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.API_GATEWAY}product`, product, { observe: 'response' });
  }

  reserveProducts(cartProducts: IAddReservation): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.API_GATEWAY}products/reserve`, cartProducts, { observe: 'response' });
  }

  addCategory(category: IAddCategoryObject): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.API_GATEWAY}category`, category, { observe: 'response' });
  }
  archiveProduct(productid: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.API_GATEWAY}product/` + productid, { observe: 'response' });
  }
}

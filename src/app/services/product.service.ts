import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../DTOs/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private client: HttpClient) { }
  // token => header of request => autharization
  Insert(product: Product): Observable<any> {
    return this.client.post('http://localhost/WarehouseAPI/api/Product', product)
  }

  // LoadAll(): Observable<any> {
  //   return this.client.get('http://localhost/WarehouseAPI/api/Product/GetAllProducts')
  // }

  SearchByName(name: string): Observable<any> {
    return this.client.get('http://localhost/WarehouseAPI/api/Product/SearchByName?name=' + name)


  }

  GetAllProducts(name: string = '', warehouseId: number): Observable<any> {
    return this.client.get(` http://localhost/WarehouseAPI/api/Product/GetAllProducts?name=${name}&warehouseId=${warehouseId}`)
  }
  delete(id: number): Observable<any> {
    return this.client.delete('http://localhost/WarehouseAPI/api/Product?Id=' + id)


  }
  Load(id: number): Observable<any> {
    return this.client.get('http://localhost/WarehouseAPI/api/Product/LoadById?Id=' + id)


  }

  Update(product: Product): Observable<any> {
    debugger
    return this.client.put('http://localhost/WarehouseAPI/api/Product', product)
  }


}

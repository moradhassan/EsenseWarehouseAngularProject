import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../DTOs/Order';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private client: HttpClient) { }

  Insert(order: Order): Observable<any> {
    return this.client.post('http://localhost/WarehouseAPI/api/Order', order)
  }

  GetAllOrders(status:string = "",priceOrder:boolean=false): Observable<any> {
    return this.client.get(`http://localhost/WarehouseAPI/api/Order/GetAllOrders?status=${status}&priceOrder=${priceOrder}`)
  }

  delete(id: number): Observable<any> {
    return this.client.delete('http://localhost/WarehouseAPI/api/Order?Id=' + id)
  }

  Load(id: number): Observable<any> {
    return this.client.get('http://localhost/WarehouseAPI/api/Order/LoadById?Id=' + id)


  }
  Update(order: Order): Observable<any> {
    return this.client.put('http://localhost/WarehouseAPI/api/Order', order)
  }
}

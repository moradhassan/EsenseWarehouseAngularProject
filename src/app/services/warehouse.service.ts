import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Warehouse } from '../DTOs/Warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private client: HttpClient) {

  }
  Insert(warehouse: Warehouse): Observable<any> {
    return this.client.post('http://localhost/WarehouseAPI/api/Warehouse', warehouse)
  }
  LoadAll(): Observable<any> {
    return this.client.get('http://localhost/WarehouseAPI/api/Warehouse/GetAllWarehouses')
  }

  delete(id: number): Observable<any> {
    return this.client.delete('http://localhost/WarehouseAPI/api/Warehouse?Id=' + id)
  }
  LoadById(id: number): Observable<any> {
    return this.client.get('http://localhost/WarehouseAPI/api/Warehouse/LoadById?Id=' + id)
  }
  Update(warehouse:Warehouse): Observable<any> {
    return this.client.put('http://localhost/WarehouseAPI/api/Warehouse' , warehouse)
  }

  
}

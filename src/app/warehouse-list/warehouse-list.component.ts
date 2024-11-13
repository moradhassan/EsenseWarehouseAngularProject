import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WarehouseService } from '../services/warehouse.service';
import { Warehouse } from '../DTOs/Warehouse';
import '@angular/localize/init';
import { Alert } from '../_shared/alert-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.css']
})
export class WarehouseListComponent implements OnInit {
  warehouses: Warehouse[] = [];
  alerts: Alert[] = [];
  constructor(private warehouseService: WarehouseService, private router:Router) { }
  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.warehouseService.LoadAll().subscribe({
      next: data => {
        this.warehouses = data;
      },
      error: () => console.log("error")
    });
  }

  delete(id: number) {
    this.warehouseService.delete(id).subscribe({
      next: (m) => {
        {
          this.alerts.push({
            type: 'danger',
            message: ` ${m.message}`

          })
          this.closeAlertAfterDelay()
         
          this.loadData();
        }
      },
      error: () => {
        this.alerts.push({
          type: 'danger',
          message: "Error happened"
        })
        this.closeAlertAfterDelay()
      }
    });
  }

  navigateToWarehouse(){
    this.router.navigate(['Home/NewWarehouse'])

  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
  closeAlertAfterDelay() {
    const alertIndex = this.alerts.length - 1;
    setTimeout(() => {
      this.close(this.alerts[alertIndex]);
    }, 5000);
  }

  edit(id:number){
    this.router.navigate(['Home/NewWarehouse'], { queryParams: { warehouseId: id } })
  }
}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Warehouse } from '../DTOs/Warehouse';
import { WarehouseService } from '../services/warehouse.service';
import '@angular/localize/init';
import { Alert } from '../_shared/alert-interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-warehouse',
  templateUrl: './new-warehouse.component.html',
  styleUrls: ['./new-warehouse.component.css']
})
export class NewWarehouseComponent implements OnInit {
  warehouseForm!: FormGroup
  alerts: Alert[] = [];
  warehouseId!: number
  isEdited: boolean = false
  constructor(private formBuilder: FormBuilder,
    private warehouseService: WarehouseService,
    private activatedRoute: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.buildForm()
    if (this.activatedRoute.snapshot.queryParams['warehouseId'] != undefined) {
      this.warehouseId = parseInt(this.activatedRoute.snapshot.queryParams['warehouseId'])
      this.edit();
      this.isEdited = true
    }
  }

  buildForm() {
    this.warehouseForm = this.formBuilder.group({
      txtWarehouseManager: ['', Validators.required],
      txtLocation: ['', Validators.required],
      ddlStatus: ['', Validators.required],
      txtCapacity: ['', Validators.compose([Validators.required, Validators.min(1)])]


    })
  }

  addWarehouse() {
    debugger
    if (this.warehouseForm.valid) {
      var warehouse = new Warehouse();
      warehouse.warehouseManager = this.warehouseForm.value["txtWarehouseManager"];
      warehouse.location = this.warehouseForm.value["txtLocation"];

      if (this.warehouseForm.value["ddlStatus"] == "true") { warehouse.status = true; }
      else { warehouse.status = false; }

      warehouse.capacity = this.warehouseForm.value["txtCapacity"];
      this.warehouseService.Insert(warehouse).subscribe({
        next: () => {
          this.alerts.push({
            type: 'success',
            message: "Warehouse Added successfully"
          })
          this.resetForm();
          this.closeAlertAfterDelay();
        },
        error: () => {
          this.alerts.push({
            type: 'danger',
            message: "Error happened"
          })
          this.closeAlertAfterDelay();
        }
      });
    }
  }

  edit() {
    this.warehouseService.LoadById(this.warehouseId).subscribe({
      next: data => {
        this.warehouseForm.controls['txtWarehouseManager'].setValue(data.warehouseManager)
        this.warehouseForm.controls['txtLocation'].setValue(data.location)
        this.warehouseForm.controls['ddlStatus'].setValue(data.status)
        this.warehouseForm.controls['txtCapacity'].setValue(data.capacity)
      }
    })
  }


  updateWarehouse() {
    debugger
    if (this.warehouseForm.valid) {

      debugger
      var warehouse = new Warehouse();
      warehouse.warehouseId = this.warehouseId
      warehouse.warehouseManager = this.warehouseForm.value["txtWarehouseManager"];
      warehouse.location = this.warehouseForm.value["txtLocation"];

      if (this.warehouseForm.value["ddlStatus"] == "true") { warehouse.status = true; }
      else { warehouse.status = false; }

      warehouse.capacity = this.warehouseForm.value["txtCapacity"];

      this.warehouseService.Update(warehouse).subscribe({
        next: () => {
          this.alerts.push({
            type: 'success',
            message: "Warehouse Updated Successfully"
          })
          this.resetForm();
          this.closeAlertAfterDelay();
        },
        error: () => {
          this.alerts.push({
            type: 'danger',
            message: "Error happened"
          })
          this.closeAlertAfterDelay();
        }
      });
    }
  }

  closeAlertAfterDelay() {
    const alertIndex = this.alerts.length - 1;
    setTimeout(() => {
      this.close(this.alerts[alertIndex]);
    }, 5000);
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  resetForm() {
    this.warehouseForm.reset({
      txtWarehouseManager: '',
      txtLocation: '',
      ddlStatus: '',
      txtCapacity: ''
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WarehouseService } from '../services/warehouse.service';
import { Warehouse } from '../DTOs/Warehouse';
import { Product } from '../DTOs/Product';
import { ProductService } from '../services/product.service';
import '@angular/localize/init';
import { Alert } from '../_shared/alert-interface';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css'],
})
export class NewproductComponent implements OnInit {
  productId!: number
  warehouses!: Warehouse[]
  productForm!: FormGroup
  alerts: Alert[] = [];
  isEdited: boolean = false
  productPictureUrl: any 
  constructor(private formBuilder: FormBuilder,
    private warehouseService: WarehouseService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.buildForm()
    this.getWarehouses()
    if (this.activatedRoute.snapshot.queryParams['productId'] != undefined) {
      this.productId = parseInt(this.activatedRoute.snapshot.queryParams['productId'])
      this.edit();
      this.isEdited = true
    }
  }
  edit() {
    debugger
    this.productService.Load(this.productId).subscribe({
      next: data => {
        this.productForm.controls['txtProductName'].setValue(data.productName)
        this.productForm.controls['txtSKU'].setValue(data.sku)
        this.productForm.controls['txtPrice'].setValue(data.price)
        this.productForm.controls['txtStock'].setValue(data.stock)
        this.productForm.controls['txtDescription'].setValue(data.description)
        this.productPictureUrl = data.image
      }
    })
  }

  getWarehouses() {
    this.warehouseService.LoadAll().subscribe({
      next: data => {
        this.warehouses = data
      },
      error: () => { console.log("An Error Happened") }
    })
  }


  buildForm() {
    this.productForm = this.formBuilder.group({
      txtProductName: ['', Validators.required],
      txtSKU: ['', Validators.required],
      txtPrice: ['', Validators.compose([Validators.required, Validators.min(1)])],
      txtStock: ['', Validators.compose([Validators.required, Validators.min(1)])],
      // ddlWarehouse: ['', Validators.required],
      txtDescription: [''],
    })

  }
  onFileSelect(file: any) {
    debugger
    let reader = new FileReader()
    reader.readAsDataURL(file.target.files[0])
    reader.onload = (_event) => {
      this.productPictureUrl = reader.result
    }
  }
  addProduct() {
    if (this.productForm.valid) {

      let userInfo = JSON.parse(localStorage.getItem('EsenseUserInfo') ?? "");

      var product = new Product();
        product.productName = this.productForm.value["txtProductName"],
        product.sku = this.productForm.value["txtSKU"],
        product.price = parseFloat(this.productForm.value["txtPrice"]),
        product.stock = this.productForm.value["txtStock"],
        product.warehouseId = parseInt(userInfo.warehouseId);
        product.description = this.productForm.value["txtDescription"],
        product.image = this.productPictureUrl

      this.productService.Insert(product).subscribe({
        next: () => {
          this.alerts.push({
            type: 'success',
            message: "Product Added"
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

  updateProduct() {
    debugger
    if (this.productForm.valid) {
      let userInfo = JSON.parse(localStorage.getItem('EsenseUserInfo') ?? "");

      var product = new Product();
      product.productId = this.productId
      product.productName = this.productForm.value["txtProductName"],
        product.sku = this.productForm.value["txtSKU"],
        product.price = parseFloat(this.productForm.value["txtPrice"]),
        product.stock = this.productForm.value["txtStock"],
        product.warehouseId = parseInt(userInfo.warehouseId),
        product.description = this.productForm.value["txtDescription"],
        product.image = this.productPictureUrl

        this.productService.Update(product).subscribe({
          next: () => {
            this.alerts.push({
              type: 'success',
              message: "Product Updated Successfully"
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



  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  closeAlertAfterDelay() {
    const alertIndex = this.alerts.length - 1;
    setTimeout(() => {
      this.close(this.alerts[alertIndex]);
    }, 5000);
  }

  resetForm() {
    this.productForm.reset({
      txtProductName: '',
      txtSKU: '',
      txtPrice: '',
      txtStock: '',
      ddlWarehouse: '',
      txtDescription: '',
    });
    this.productPictureUrl = ''; 
  }


}

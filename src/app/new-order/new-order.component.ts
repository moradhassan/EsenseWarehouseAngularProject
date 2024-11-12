import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../DTOs/Product';
import { Order } from '../DTOs/Order';
import { OrderService } from '../services/order.service';
import { Alert } from '../_shared/alert-interface';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  orderForm!: FormGroup
  products!: Product[]
  alerts: Alert[] = [];
  orderId!: number
  isEdited: boolean = false

  constructor(private formBuilder: FormBuilder, private productService: ProductService,
    private orderService: OrderService, private activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.buildForm()
    this.getProducts()
    if (this.activatedRoute.snapshot.queryParams['orderId'] != undefined) {
      this.orderId = parseInt(this.activatedRoute.snapshot.queryParams['orderId'])
      this.edit();
      this.isEdited = true
    }
  }

  buildForm() {
    this.orderForm = this.formBuilder.group({
      txtCustomerName: ['', Validators.required],
      ddlProductName: ['', Validators.required],
      txtQuantity: ['', Validators.compose([Validators.required, Validators.min(1)])],
      ddlOrderStatus: ['', Validators.required],
      txtShippingAddress: ['', Validators.required],
      ddlPaymentMethod: ['', Validators.required]

    })
  }

  getProducts() {
    let userInfo = JSON.parse(localStorage.getItem('EsenseUserInfo') ?? "");
    let warehouseId = parseInt(userInfo.warehouseId)
    this.productService.GetAllProducts('', warehouseId).subscribe({
      next: data => {
        this.products = data
      },
      error: () => { console.log("An Error Happened") }
    })
  }

  addOrder() {
    if (this.orderForm.valid) {
      var order = new Order();
      order.customerName = this.orderForm.value["txtCustomerName"],
        order.productId = this.orderForm.value["ddlProductName"],
        order.quantity = parseFloat(this.orderForm.value["txtQuantity"]),
        order.status = this.orderForm.value["ddlOrderStatus"],
        order.shippingAddress = this.orderForm.value["txtShippingAddress"],
        order.paymentMethod = this.orderForm.value["ddlPaymentMethod"]

      debugger
      this.orderService.Insert(order).subscribe({
        next: () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Order has been added successfully",
            showConfirmButton: false,
            timer: 2000
          });
          this.resetForm();

        },
        error: () => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Something went wrong!",
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
    }
  }

  edit() {
    debugger
    this.orderService.Load(this.orderId).subscribe({
      next: data => {
        this.orderForm.controls['txtCustomerName'].setValue(data.customerName)
        this.orderForm.controls['ddlProductName'].setValue(data.product.productId)
        this.orderForm.controls['txtQuantity'].setValue(data.quantity)
        this.orderForm.controls['ddlOrderStatus'].setValue(data.status)
        this.orderForm.controls['txtShippingAddress'].setValue(data.shippingAddress)
        this.orderForm.controls['ddlPaymentMethod'].setValue(data.paymentMethod)
      }
    })
  }

  updateOrder() {
    debugger
    if (this.orderForm.valid) {

      var order = new Order();
      order.orderId = this.orderId
      order.customerName = this.orderForm.value["txtCustomerName"],
        order.productId = this.orderForm.value["ddlProductName"],
        order.quantity = parseInt(this.orderForm.value["txtQuantity"]),
        order.status = this.orderForm.value["ddlOrderStatus"],
        order.shippingAddress = this.orderForm.value["txtShippingAddress"],
        order.paymentMethod = this.orderForm.value["ddlPaymentMethod"],



        this.orderService.Update(order).subscribe({
          next: (response:any) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: response.message,
              showConfirmButton: false,
              timer: 2000
            });
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
    this.orderForm.reset({
      txtCustomerName: '',
      ddlProductName: '',
      txtQuantity: '',
      ddlOrderStatus: '',
      txtShippingAddress: '',
      ddlPaymentMethod: ''
    });
  }

}

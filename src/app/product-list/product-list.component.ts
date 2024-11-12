import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../DTOs/Product';
import '@angular/localize/init';
import { Alert } from '../_shared/alert-interface';
import { Router } from '@angular/router';
import { query } from '@angular/animations';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @ViewChild('txtSearchName') name!: ElementRef
  products: Product[] = [];
  alerts: Alert[] = [];


  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(searchTerm: string = "") {
    let userInfo = JSON.parse(localStorage.getItem('EsenseUserInfo') ?? "");
    let warehouseId = parseInt(userInfo.warehouseId)
    debugger

    this.productService.GetAllProducts(searchTerm, warehouseId).subscribe({
      next: data => {
        this.products = data;
      },
      error: () => console.log("error")
    });
  }

  search() {
    this.loadData(this.name.nativeElement.value);
  }

  delete(id: number) {
    debugger
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.delete(id).subscribe({
          next: () => {
            {
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
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });

  }
  navigateToNewProduct() {
    this.router.navigate(['Home/NewProduct'])
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

  edit(id: number) {
    //navigate to new employee and pass the id 
    this.router.navigate(['Home/NewProduct'], { queryParams: { productId: id } })
  }

}
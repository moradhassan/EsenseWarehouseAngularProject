import { Component, OnInit } from '@angular/core';
import { Order } from '../DTOs/Order';
import { OrderService } from '../services/order.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FiltermodalComponent } from './filtermodal/filtermodal.component';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  orders!: Order[]
  priceOrder:boolean=false
  selectedOrderStatus: string = "";

  constructor(private orderService: OrderService, private router: Router, private modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.orderService.GetAllOrders().subscribe({
      next: data => {
        this.orders = data
      },
      error: () => console.log("error")
    });
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
        this.orderService.delete(id).subscribe({
          next: () => {
            {

              this.loadData();
            }
          },
          error: () => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Error",
              showConfirmButton: false,
              timer: 2000
            });
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

  navigateToNewOrder() {
    this.router.navigate(['Home/NewOrder'])
  }

  edit(id: number) {
    this.router.navigate(['Home/NewOrder'], { queryParams: { orderId: id } })
  }

  onFilter() {
    // Open the modal
    let modalRef: NgbModalRef = this.modalService.open(FiltermodalComponent, {
      ariaLabelledBy: 'Filter Orders',
      size: 'sm'
    });

    // Handle the result when the modal is closed
    modalRef.result.then(
      (selectedStatus: string) => {
        this.selectedOrderStatus = selectedStatus;
        this.orderService.GetAllOrders(this.selectedOrderStatus).subscribe({
          next: data => {
            this.orders = data
          }
        });
      },
    );
  }

  onPriceOrder(){
    this.priceOrder=!this.priceOrder
    this.orderService.GetAllOrders(this.selectedOrderStatus,this.priceOrder).subscribe({
      next: data => {
        this.orders = data
      }
    });
  }
}

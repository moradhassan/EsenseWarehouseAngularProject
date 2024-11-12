import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Role } from '../DTOs/Role';
import { SignUp } from '../DTOs/SignUp';
import { WarehouseService } from '../services/warehouse.service';
import { Warehouse } from '../DTOs/Warehouse';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  userForm!: FormGroup
  warehouses!: Warehouse[]
  userName!: string
  roles!: Role[]
  isEdited: boolean = false


  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private warehouseService: WarehouseService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.buildForm()
    this.loadRoles()
    this.getWarehouses()
    if (this.activatedRoute.snapshot.queryParams['userName'] != undefined) {
      this.userName = this.activatedRoute.snapshot.queryParams['userName']
      this.edit();
      this.isEdited = true
      this.userForm.controls['txtPassword'].reset();
      this.userForm.controls['txtPassword'].clearValidators();
      this.userForm.controls['txtPassword'].updateValueAndValidity();
    }
  }

  loadRoles() {
    this.accountService.getRoles().subscribe({
      next: data => {
        debugger
        this.roles = data
      }
    })
  }

  buildForm() {
    this.userForm = this.formBuilder.group({
      txtName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]{3,}')])],
      // 
      txtUserName: ['', Validators.required],
      // 
      txtEmail: ['', Validators.compose([Validators.required, Validators.email])],
      // 
      txtPassword: ['', Validators.required],
      // 
      ddlRole: ['', Validators.required],
      // 
      ddlWarehouse: [''],

    })
  }

  AddUser() {
    debugger
    var user = new SignUp();
    user.name = this.userForm.value['txtName']
    user.userName = this.userForm.value['txtUserName']
    user.email = this.userForm.value['txtEmail']
    user.password = this.userForm.value['txtPassword']
    user.roleName = this.userForm.value['ddlRole']
    user.warehouseId = parseInt(this.userForm.value["ddlWarehouse"])

    this.accountService.createAccount(user).subscribe({
      next: () => {
        debugger
        Swal.fire({
          position: "center",
          icon: "success",
          title: "New User Created",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

  getWarehouses() {
    this.warehouseService.LoadAll().subscribe({
      next: data => {
        this.warehouses = data
      }
    })
  }

  edit() {
    debugger
    this.accountService.Load(this.userName).subscribe({
      next: data => {
        this.userForm.controls['txtName'].setValue(data.name)
        this.userForm.controls['txtUserName'].setValue(data.userName)
        this.userForm.controls['txtEmail'].setValue(data.email)

        this.accountService.getUserRoles(this.userName).subscribe({
          next: data => this.userForm.controls['ddlRole'].setValue(data[0])

        })

        this.userForm.controls['ddlWarehouse'].setValue(data.warehouseId)
      }
    })
  }

  onUpdate() {
    debugger

    var user = new SignUp();
    user.name = this.userForm.value['txtName']
    user.userName = this.userForm.value['txtUserName']
    user.email = this.userForm.value['txtEmail']
    user.roleName = [this.userForm.value['ddlRole']]
    if (user.roleName[0] == 'employee') {
      user.warehouseId = parseInt(this.userForm.value["ddlWarehouse"])
    }
    this.accountService.Update(user).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'User Updated',
          text: 'User details updated successfully!',
          timer: 2000,
          timerProgressBar: true,
        })
      },
    });
  }
}






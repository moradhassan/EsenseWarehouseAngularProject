import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationUserDto } from '../DTOs/User';
import { AccountService } from '../services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: ApplicationUserDto[] = []
  constructor(private router: Router, private accountService: AccountService) {

  }
  ngOnInit(): void {
    this.loadAll();

  }
  loadAll() {
    this.accountService.getAllUsers().subscribe({
      next: data => {
        this.users = data
      }
    })
  }
  navigateToNewUser() {
    this.router.navigate(['Home/NewUser'])

  }

  delete(userName: string) {

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
        this.accountService.deleteUser(userName).subscribe({
          next: (response) => {
            {
              Swal.fire({
                title: "Deleted!",
                text: response.message,
                icon: "success"
              });
              this.loadAll();
            }
          },
        });
      }
    });
  }
  edit(userName: string) {
    this.router.navigate(['Home/NewUser'], { queryParams: { userName: userName } })

  }
}

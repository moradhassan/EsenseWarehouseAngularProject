import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ngbCarouselTransitionOut } from '@ng-bootstrap/ng-bootstrap/carousel/carousel-transition';
import { SignIn } from '../DTOs/SignIn';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router) { }

  ngOnInit(): void {
    this.buildForm()
  }
  buildForm() {
    this.loginForm = this.formBuilder.group({

      txtUserName: ['', Validators.required],
      txtPassword: ['', Validators.required],

    })
  }
  login() {
    debugger
    if (this.loginForm.valid) {
      var login = new SignIn();
      login.username = this.loginForm.value['txtUserName']
      login.password = this.loginForm.value['txtPassword']

      this.accountService.signIn(login).subscribe({
        next: data => {
          debugger
          localStorage.setItem('EsenseSecurityKey', data.tokenValue)
          this.accountService.getUserRoles(this.loginForm.value['txtUserName']).subscribe({

            next: data => {
              debugger
              localStorage.setItem("EsenseUserRoles", data)
              this.accountService.getUserInfo(this.loginForm.value['txtUserName']).subscribe({
                next: data => {
                  localStorage.setItem("EsenseUserInfo", JSON.stringify(data))

                  this.router.navigate(['/Home/Dashboard'])

                },
                error: () => console.log("UserInfo Error")
              })
            },
            error: () => console.log("Role retreiving Error")
          })

        },
        error: () => console.log("Error")
      })
    }
  }
}

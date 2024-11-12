import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUp } from '../DTOs/SignUp';
import { SignIn } from '../DTOs/SignIn';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseurl = ''
  constructor(private client: HttpClient) {
    this.baseurl = environment.APIUrl
  }

  getRoles(): Observable<any> {
    return this.client.get(this.baseurl + '/api/Account/GetRoles')
  }

  createAccount(signUp: SignUp): Observable<any> {
    return this.client.post(this.baseurl + '/api/Account/SignUp', signUp)
  }

  signIn(signIn: SignIn): Observable<any> {
    return this.client.post(this.baseurl + '/api/Account/SignIn', signIn)
  }

  getUserRoles(username: string): Observable<any> {
    return this.client.get(this.baseurl + '/api/Account/getUserRoles?username=' + username)
  }

  getUserInfo(username: string): Observable<any> {
    return this.client.get(this.baseurl + '/api/Account/GetUserInfo?username=' + username)
  }
  getAllUsers(): Observable<any> {
    return this.client.get(this.baseurl + '/api/Account/GetAllUsers')
  }
  deleteUser(userName: string): Observable<any> {
    return this.client.get(this.baseurl + '/api/Account/DeleteUser?username=' + userName)
  }
  Load(userName: string): Observable<any> {
    return this.client.get('http://localhost/WarehouseAPI/api/Account/GetUserInfo?username=' + userName)
  }

  Update(userDto: SignUp): Observable<any> {
    debugger
    return this.client.put('http://localhost/WarehouseAPI/api/Account', userDto)
  }
}

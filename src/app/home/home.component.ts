import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { menu } from '../Menu';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent {
  liMenu: any=[]
  filteredMenu: any=[]
  role!:string
  constructor(private router: Router) {
    debugger
    this.liMenu = menu
    this.role = JSON.parse(JSON.stringify(localStorage.getItem('EsenseUserRoles')));
    
    
    this.liMenu.forEach((element: any) => {
      const isInRole = element.roles.find((x: any) => x == this.role);
      if (isInRole != undefined) {
        this.filteredMenu.push(element);
      }
    });
  }

  logout(){
    localStorage.removeItem('EsenseSecurityKey')
    localStorage.removeItem('EsenseUserRoles')
    localStorage.removeItem('EsenseUserInfo')

    this.router.navigate(['/'])
  }
}

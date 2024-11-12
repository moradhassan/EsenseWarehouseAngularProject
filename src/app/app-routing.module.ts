import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NewproductComponent } from './newproduct/newproduct.component';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { NewWarehouseComponent } from './new-warehouse/new-warehouse.component';
import { UsersListComponent } from './users-list/users-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { Error404Component } from './error404/error404.component';
import { authenticationGuard } from './_guards/authentication.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Error401Component } from './error401/error401.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {path:'error404', component:Error404Component},
  { path: 'error401', component: Error401Component },
  {
    path: 'Home', component: HomeComponent, canActivate:[authenticationGuard], children: [
      { path: 'OrderList', component: OrdersListComponent },
      { path: 'NewOrder', component: NewOrderComponent },
      { path: 'ProductList', component: ProductListComponent },
      { path: 'NewProduct', component: NewproductComponent },
      { path: 'WarehouseList', component: WarehouseListComponent },
      { path: 'NewWarehouse', component: NewWarehouseComponent },
      { path: 'UserList', component: UsersListComponent },
      { path: 'NewUser', component: NewUserComponent },
      { path: 'Dashboard', component: DashboardComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

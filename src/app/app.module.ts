import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsersListComponent } from './users-list/users-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NewproductComponent } from './newproduct/newproduct.component';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { NewWarehouseComponent } from './new-warehouse/new-warehouse.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationInterceptor } from './_Interceptors/authentication.interceptor';
import { ErrorhandlingInterceptor } from './_Interceptors/errorhandling.interceptor';
import { Error404Component } from './error404/error404.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PieChartComponent } from './dashboard/pie-chart/pie-chart.component';
import { Error401Component } from './error401/error401.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersListComponent,
    NewUserComponent,
    OrdersListComponent,
    NewOrderComponent,
    ProductListComponent,
    NewproductComponent,
    WarehouseListComponent,
    NewWarehouseComponent,
    HomeComponent,
    Error404Component,
    DashboardComponent,
    PieChartComponent,
    Error401Component,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgbAlertModule,

  ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorhandlingInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

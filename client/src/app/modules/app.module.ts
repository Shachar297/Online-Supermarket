import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';


import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { AsideComponent } from '../components/aside/aside.component';
import { LayoutComponent } from '../components/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { UsersService } from '../services/users.service';
import { AuthenticationInterceptor } from '../interceptors/AuthenticationInterceptor';
import { RouterModule } from '@angular/router';
import { AdminComponent } from '../components/admin/admin.component';
import { CustomerComponent } from '../components/customer/customer.component';
import { ProductsComponent } from '../components/products/products.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { productService } from '../services/product.service';
import { ModalcomponentComponent } from '../components/modalcomponent/modalcomponent.component';
import { productPipeByCategory } from '../pipes/productPipeByCategory';
import { ProductidComponent } from '../components/productid/productid.component';
import { SocketService } from '../services/socket.service';
import { OrderComponent } from '../components/order/order.component';
import { HomeComponent } from '../components/home/home.component';
import { AddProductComponent } from '../components/add-product/add-product.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    CustomerComponent,
    ProductsComponent,
    ProductCardComponent,
    ModalcomponentComponent,
    productPipeByCategory,
    ProductidComponent,
    OrderComponent,
    HomeComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [
    UsersService,
    productService,
    SocketService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }

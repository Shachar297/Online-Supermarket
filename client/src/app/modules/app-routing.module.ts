import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from '../components/add-product/add-product.component';
import { AdminComponent } from '../components/admin/admin.component';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { OrderComponent } from '../components/order/order.component';
import { ProductidComponent } from '../components/productid/productid.component';
import { ProductsComponent } from '../components/products/products.component';
import { RegisterComponent } from '../components/register/register.component';
import { AdminGuard } from '../guards/admin.guard';
import { UserGuard } from '../guards/user.guard';

const routes: Routes = [
  {path : "home" , component : HomeComponent},
  {path : "login" , component : LoginComponent},
  {path : "register" , component : RegisterComponent},
  {path : "products" , canActivate : [UserGuard], component : ProductsComponent},
  {path : "admin" , canActivate: [AdminGuard], component : AdminComponent},
  {path  :"admin/addProduct" , canActivate : [AdminGuard] , component : AddProductComponent},
  {path : "product/:id" , component : ProductidComponent},
  {path : "orders" , component : OrderComponent},
  {path: "", redirectTo: "login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

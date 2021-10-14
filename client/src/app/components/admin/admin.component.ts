import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { productService } from 'src/app/services/product.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public products: Product[];
  constructor(private productService: productService , private userService : UsersService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts = async () => {
    let observable = this.productService.getAllProducts();
    observable.subscribe(
      (success) => {
        this.products = success;
      },
      (failure) => {}
    );
  };

  removeItem(id: number) {
  }

  editItem(id : number){
  }
}

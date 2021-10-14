import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { categoriesService } from 'src/app/services/categories.service';
import { StateService } from 'src/app/services/stateservice';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  private categoryId : number;
  private products : Product[] = [];
  constructor(
    public stateService: StateService,
    private categoriesService: categoriesService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    let observable = this.categoriesService.getAllCategories();
    observable.subscribe(
      (categories) => {
        this.stateService.categories = categories;
        this.products = this.stateService.products;
        console.log(categories)
      },
      (failed) => {
        console.error(failed.error.error);
      }
    );
  }

  sortCategories(event : any){
    console.log(event.innerText);
    if (event.innetText != 'All Products') {
      this.categoryId = event.innerText;
      let observable = this.categoriesService.getCategoryByName(event.innerText);
      observable.subscribe(
        (pipedProductsByCategories) => {
          this.stateService.products = pipedProductsByCategories;
        },
        (no) => {}
      );
    } else if (event.innerText == 'All Products') {
      this.stateService.products = this.products;
    }
  }

}

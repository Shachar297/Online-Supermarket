import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/Product';

@Pipe({
  name: 'productPipeByCategory',
})
export class productPipeByCategory implements PipeTransform {
  transform(products: Product[], categoryId: number): any {
      if(categoryId != 0){
        return products.filter(
            (product) => product.categoryId === categoryId
          );
        }
      }


}

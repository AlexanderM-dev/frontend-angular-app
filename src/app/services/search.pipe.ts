import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../main/product-list/product-list.component';

@Pipe({
    name: 'searchProduct'
})
export class SearchPipe implements PipeTransform {

    transform(products: IProduct[], search = ''): IProduct[] {
        if (!search.trim()) {
            return products;
        }

        return products.filter(product => {
            return product.name.toLowerCase().includes(search.toLowerCase());
        });
    }
}
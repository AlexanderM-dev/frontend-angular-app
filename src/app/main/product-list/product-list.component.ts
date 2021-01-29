import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

export interface IProduct {
  id: number;
  name: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: IProduct[] = [];

  panelOpenState1 = false;
  panelOpenState2 = false;
  productNameValue = '';
  productId: number | boolean = false;
  newProductNameValue = '';


  isAdmin = localStorage.getItem('isAdmin');

  productFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ]);

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {    
    if (this.isAdmin) {
      this.getProductList();
    } else {
      this.products = [{id: 1, name: 'Hello1'}, {id: 2, name: 'Hello2'}, {id: 3, name: 'Hello3'}]
    }
  }

  togglePanelAdd(): void {
    this.newProductNameValue = '';
    this.productFormControl.setValue('');
    this.productFormControl.markAsUntouched();
    this.panelOpenState2 = false;
    this.panelOpenState1 = !this.panelOpenState1;
  }

  togglePanelChange(): void {
    this.newProductNameValue = '';
    this.productFormControl.setValue('');
    this.productFormControl.markAsUntouched();
    this.panelOpenState1 = false;
    this.panelOpenState2 = !this.panelOpenState2;
  }

  addNewProduct(): void {
    this.panelOpenState1 = false;
    this.newProductNameValue = '';

    this.api.addNewProduct({
      name: this.productFormControl.value
    })
      .subscribe({
        next: (response) => {
          this.getProductList();
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  changeProduct(): void {
    if (typeof this.productId === 'number') {
      this.panelOpenState2 = false;
      this.newProductNameValue = '';
      this.api.changeProduct({
        name: this.productFormControl.value
      }, this.productId).subscribe({
        next: (response) => {
          this.getProductList();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  getProductList(): void {
    if (this.isAdmin) {
      this.api.getAllProductsToAdmin()
        .subscribe({
          next: (response) => {
            this.products = response.allProducts;
            this.products = this.products.sort((a: IProduct, b: IProduct) => a.id - b.id);
          },
          error: (err) => {
            console.log(err);
          }
        });
    }
  }

  getProductId(id: number): void {
    this.api.productIdValue$.next(id);
    this.productId = id;
  }

  deleteProduct(): void {
    if (typeof this.productId === 'number') {
      this.api.deleteProduct(this.productId).subscribe({
        next: (response) => {
          this.getProductList();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

}

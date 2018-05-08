import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  pageTitle = 'Product List!';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  _listFilter: string;
  filteredProducts: IProduct[];
  products: IProduct[] ;

  constructor(private _productService: ProductService) {
  }

  get listFilter(): string {
      return this._listFilter;
  }

  set listFilter(value: string) {
      this._listFilter = value;
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  ngOnInit() {
      this.products = this._productService.getProducts();
      this.filteredProducts = this.products;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
       product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage() {
      this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
      this.pageTitle = 'Product List: ' + message;
  }
}

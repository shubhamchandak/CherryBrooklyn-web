import { Component, OnInit } from '@angular/core';
import { IItem } from 'src/app/interfaces/IItem';
import { ProductService } from 'src/app/services/product.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
    selector: 'app-item-container',
    templateUrl: './item-container.component.html',
    styleUrls: ['./item-container.component.css']
})

export class ItemContainerComponent implements OnInit {

    public items: IItem[] = [];
    public displayType = 1;

    constructor(
        private productService: ProductService,
        private loaderService: NgxUiLoaderService) {

    }
    ngOnInit() {
        this.items = this.productService.products;
        if (this.items.length === 0) {
            this.loaderService.start();
            this.productService.getProducts().subscribe(
                (data: {count: number, product: IItem[]}) => {
                    this.productService.products = data.product;
                    this.items = this.productService.products;
                    this.loaderService.stop();
                },
                error => {
                    this.loaderService.stop();
                }
            );
        }
    }
}

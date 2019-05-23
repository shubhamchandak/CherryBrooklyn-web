import { Component, OnInit } from '@angular/core';
import { IItem } from 'src/app/interfaces/IItem';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-item-container',
    templateUrl: './item-container.component.html',
    styleUrls: ['./item-container.component.css']
})

export class ItemContainerComponent implements OnInit {

    public items: IItem[] = [];

    constructor(private productService: ProductService) {

    }
    ngOnInit() {
        this.items = this.productService.products;
        if (this.items.length === 0) {
            this.productService.getProducts().subscribe((data: {count: number, product: IItem[]}) => {
                this.productService.products = data.product;
                this.items = this.productService.products;
            });
        }
    }
}

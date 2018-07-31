import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = [
    {
      name: 'Item 1',
      price: 90,
      info: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
      reviewsShow: false,
      reviews: [
        {
          name: 'Denis',
          text: 'Review text'
        },
        {
          name: 'Viktor',
          text: 'Review text from Viktor'
        }
      ]
    },
    {
      name: 'Item 2',
      price: 96,
      info: 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
      reviewsShow: false,
      reviews: [
        {
          name: 'Ivan',
          texts: 'Review text'
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  deleteProduct(index) {
    this.products.splice(index, 1);
  }

}

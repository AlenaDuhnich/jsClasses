import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  brand: string = "MyApp";
  author: string = "Alena Dukhnich";

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { ClientFormItem } from "../../models/ClientFormItem";

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  client: ClientFormItem = {
    name: '',
    email: '',
    age: 0,
    phone: '',
    comments: ''
  };
  clientList: ClientFormItem[];

  name = '';
  email = '';
  age = 0;
  phone = '';
  comments = '';

  constructor() { }

  ngOnInit() {
    this.clientList = [
      {
        name: 'Klaus',
        email: 'klaus@klaus.com',
        age: 23,
        phone: '12345',
        comments: 'Hello, world!'
      },
      {
        name: 'Elza',
        email: 'elza@elza.com',
        age: 12,
        phone: '54321',
        comments: 'Goodbye, world!'
      }
    ];
  }

  onSubmit(form) {

    if(form.invalid) return;

    const newClient = {
      name: this.client.name,
      email: this.client.email,
      age: this.client.age,
      phone: this.client.phone,
      comments: this.client.comments
    };

    this.clientList.push(newClient);
    form.resetForm();
  }

  deleteItem(item) {
    let index = this.clientList.indexOf(item);
    this.clientList.splice(index, 1);
  }

}

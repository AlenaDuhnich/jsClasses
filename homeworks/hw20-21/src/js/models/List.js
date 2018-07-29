import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(ingredient) {
    const newItem = {
      id: uniqid(),
      ingredient
    }
    this.items.push(newItem);
    this.result = this.items;
  }

  deleteItem(id) {
    
  }
}
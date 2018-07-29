import {api, key, proxy} from '../config';

export default class Search {
  constructor(query) {
    this.query = query;
    this.result = {};
  }

  async getResult() {
    const key = '016fd137db51f50688b58b4852bcc319';
    try {
      const res = await fetch(`${proxy}${api}/search?key=${key}&q=${this.query}`);
      const data = await res.json();
      return this.result = data.recipes;
    } catch (error) {
      console.log(error);
    }
  }
}
import uniqid from "uniqid";

export default class Likes {
  constructor(id, author, title, img) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.img = img;
    this.result = this.getLikeFromLocalStorage();
  }

  getLikeFromLocalStorage() {
    let likes;
    if (!localStorage.getItem('likes')) {
      likes = [];
    } else {
      likes = JSON.parse(localStorage.getItem('likes')); // Перегоняем их из json в обычный массив
    }
    return likes;
  }

  addLikeToLocalStorage(like) {
    const likes = this.getLikeFromLocalStorage();
    likes.unshift(like);
    localStorage.setItem('likes', JSON.stringify(likes));
  }

  removeLikeFromLocalStorageById(id) {
    let likes = this.getLikeFromLocalStorage();

    likes.some(function(item, i){
      if(item.id === id) {
        likes.splice(i, 1);
        return true;
      }
      return false;
    });

    localStorage.setItem('likes', JSON.stringify(likes));
  }

  addLike() {
    this.addLikeToLocalStorage(this);
    this.result = this.getLikeFromLocalStorage();
  }
}
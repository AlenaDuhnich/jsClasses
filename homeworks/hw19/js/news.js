class FavoriteNews {
  constructor() {
    this.db = FirestoreInit.getInstance().getDb();
    this.collectionName = "favorite-news";
  }

  getFavoriteNews() {
    return new Promise((resolve, reject) => {
      this.db.collection(this.collectionName).get()
          .then((querySnapshot) => resolve(querySnapshot))
          .catch(err => reject(err));
    })
  }

  addFavoriteNews(news) {
    return new Promise((resolve, reject) => {
      this.db.collection(this.collectionName).add(news)
          .then(docRef => resolve(docRef))
          .catch(err => reject(err));
    })
  }

  removeFavoriteNews(id) {
    return new Promise((resolve, reject) => {
      this.db.collection(this.collectionName).doc(id).delete()
          .then(function() {
            const toastMes = `The news was successfully removed!`;
            M.toast({html: toastMes});
          })
          .catch(err => reject(err));
    })
  }

}
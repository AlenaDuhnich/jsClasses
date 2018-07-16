// Init UI
const ui = new UI();
// Api key
const apiKey = "9c27b0f722b84da5a08312d2b125351b";
// Init Favorite News
const news = new FavoriteNews();
// Init news store
const newsStore = NewsStore.getInstance();

const newsContainer = document.querySelector('.news-container');

newsContainer.addEventListener("click", removeFavorite);

// по загрузке страницы получить все избранные новости
window.addEventListener("load", onLoad);

function onLoad(e) {
  // получить избранные новости
  news.getFavoriteNews()
      .then(favoriteNews => {
        // выводим в разметку
        favoriteNews.forEach((doc) => {
          ui.addFavoriteNews(doc.data(), doc.id);
          ui.showNews();
        });
        if(favoriteNews.empty) {
          ui.showInfo('There is no one news in favorites yet!');
        }
      })
      .catch(err => {
        console.log(error);
      })
}

function removeFavorite(e) {
  if (e.target.classList.contains("remove-favorite")) {
    const index = e.target.dataset.id;
    ui.removeFavoriteNews(e.target);
    news.removeFavoriteNews(index);
  }
}
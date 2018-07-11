// Init http
const http = new HttpNew();
// Init UI
const ui = new UI();
// Api key
const apiKey = "9c27b0f722b84da5a08312d2b125351b";
// Init Favorite News
const news = new FavoriteNews();
// Init news store
const newsStore = NewsStore.getInstance();

const filter = {
    country: null,
    category: null
};

const auth = new Auth();

// Init elements
const select = document.getElementById("country");
const selectCat = document.getElementById("category");
const selResource = document.getElementById("resource");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const logout = document.querySelector('.logout');
const newsContainer = document.querySelector('.news-container');

// All events
select.addEventListener("change", onChangeCountry);
selectCat.addEventListener("change", onChangeCategory);
selResource.addEventListener("change", onChangeResource);
searchBtn.addEventListener("click", onSearch);
logout.addEventListener("click", onLogout);
newsContainer.addEventListener("click", addFavorite);

// Check auth state
firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    window.location = 'login.html';
  }
});

// Event handlers

function performSearch() {
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}`;
    // перебираем ключи объекта filter и подставляем в запрос значения, если они есть
    Object.keys(filter).forEach(function (key) {
        if (filter[key] !== null) {
            url += `&${key}=${filter[key]}`;
        }
    });
    http.get(url)
        .then(data => {
            if (data.totalResults) {
                ui.clearContainer();
                data.articles.forEach((news, index) => ui.addNews(news, index));
                // save news to NewsStore
              newsStore.setNews(data.articles);
            } else {
                let countryError = '';
                if (filter.country !== null) {
                    countryError = 'по стране ' + select.options[select.selectedIndex].text;
                }
                ui.showInfo(`Новости по категории ${selectCat.options[selectCat.selectedIndex].text} ${countryError} не найдены`);
            }
        })
        .catch(err => {
            ui.showError(err);
        })
}

function onChangeCountry(e) {
    ui.showLoader();
    filter.country = select.value;
    performSearch();
}

function onChangeCategory(e) {
    ui.showLoader();
    filter.category = selectCat.value;
    performSearch();
}

function onChangeResource(e) {
    ui.showLoader();
    http.get(`https://newsapi.org/v2/top-headlines?sources=${selResource.value}&apiKey=${apiKey}`)
        .then(data => {
            ui.clearContainer();
            data.articles.forEach(news => ui.addNews(news));
        })
        .catch(err => {
            ui.showError(err);
        });
}

function onSearch(e) {
    http.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`)
        .then(data => {
            ui.clearContainer();
            if (data.totalResults) {
                data.articles.forEach(news => ui.addNews(news));
            } else {
                ui.showInfo("По вашему запросу новостей не найдено!");
            }
        })
        .catch(err => {
            ui.showError(err);
        });
}

// Генерируем селект для ресурсов
(function getSelect() {
    http.get(`https://newsapi.org/v2/sources?apiKey=${apiKey}`)
        .then(data => {
            for (let i = 0; i < 10; i++) {
                let resName = data.sources[i].name;
                let resId = data.sources[i].id;
                let newOption = new Option(resName, resId);
                selResource.appendChild(newOption);
            }
            // пересобираем материал селект из-за динамического контента
            M.FormSelect.init(selResource);
        })
        .catch(err => {
            ui.showError(err);
        });

})();

function onLogout() {
  auth.logout()
      .then(() => window.location = 'login.html')
      .catch(err => console.log(err));
}

function addFavorite(e) {
  if (e.target.classList.contains("add-favorite")) {
    const index = e.target.dataset.index;
    const oneNews = newsStore.getNews()[index];
    news.addFavoriteNews(oneNews)
        .then(data => {
          const toastMes = `The ${oneNews.title} was successfully added to favorites!`;
          M.toast({html: toastMes});
        })
        .catch(err => {
          console.log(err);
        })
  }
}
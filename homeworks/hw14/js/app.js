// Init http
const http = new Http();
// Init UI
const ui = new UI();
// Api key
const apiKey = "ba50d7c8744b4955887cbb72bdba375b";

const filter = {
    country: null,
    category: null
};

// Init elements
const select = document.getElementById("country");
const selectCat = document.getElementById("category");
const selResource = document.getElementById("resource");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");

// All events
select.addEventListener("change", onChangeCountry);
selectCat.addEventListener("change", onChangeCategory);
selResource.addEventListener("change", onChangeResource);
searchBtn.addEventListener("click", onSearch);

// Event handlers

function performSearch() {
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}`;
    // перебираем ключи объекта filter и подставляем в запрос значения, если они есть
    Object.keys(filter).forEach(function(key) {
        if (filter[key] !== null) {
            url += `&${key}=${filter[key]}`;
        }
    });
    http.get(url, function (err, res) {
        if (err) return ui.showError(err);
        const response = JSON.parse(res);

        if (response.totalResults) {
            ui.clearContainer();
            response.articles.forEach(news => ui.addNews(news));
        } else {
            let countryError = '';
            if (filter.country !== null) {
                countryError = 'по стране ' + select.options[select.selectedIndex].text;
            }
            ui.showInfo(`Новости по категории ${selectCat.options[selectCat.selectedIndex].text} ${countryError} не найдены`);
        }
    });
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
    http.get(`https://newsapi.org/v2/top-headlines?sources=${selResource.value}&apiKey=${apiKey}`, function(err, res) {
        if (!err) {
            const response = JSON.parse(res);
            ui.clearContainer();
            response.articles.forEach(news => ui.addNews(news));
        } else {
            ui.showError(err);
        }
    });
}

function onSearch(e) {
  // Делаем запрос на получение новостей по тому что введено в инпут
  http.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`, function (err, res) {
    if (err) return ui.showError(err);

    const response = JSON.parse(res);

    if (response.totalResults) {
      // Удаляем разметку из контейнера
      ui.clearContainer();
      // перебираем новости из поля articles в объекте response
      response.articles.forEach(news => ui.addNews(news));
    } else {
      ui.showInfo("По вашему запросу новостей не найдено!");
    }
  });
}

// Генерируем селект для ресурсов
(function getSelect() {
    http.get(`https://newsapi.org/v2/sources?apiKey=${apiKey}`, function(err, res) {
        if (!err) {
            const response = JSON.parse(res);
            for (let i = 0; i < 10; i++) {
                let resName = response.sources[i].name;
                let resId = response.sources[i].id;
                let newOption = new Option(resName, resId);
                selResource.appendChild(newOption);
            }
            // пересобираем материал селект из-за динамического контента
            M.FormSelect.init(selResource);
        } else {
            ui.showError(err);
        }
    })
})();

// Отдельный запрос на получение ресурсов
// генерируем селект с ресурсами
// <option value="abc-news">Abc News</option>
// при выборе ресурса подгружаете новости с этим ресурсом
// возможность выбора новостей по категории и стране
// Если новостей нет по выбранной категоррии нужно вывести что "Новости по категории такой то по стране такойто не найдены"
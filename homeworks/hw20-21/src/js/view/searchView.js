import {elements} from "./base";

export const getSearchInputValue = () => elements.searchInput.value;

export const clearForm = () => elements.searchForm.reset();

export const clearResult = () => {
  elements.searchResList.innerHTML = '';
  elements.searchResPages.innerHTML = '';
};

export const highLightSelected = id => {
  const resultsArr = document.querySelectorAll('.results__link');
  resultsArr.forEach(el => el.classList.remove('results__link--active'));
  document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};

const renderRecipe = recipe => {
  const markup = `
  <li>
    <a class="results__link" href="#${recipe.recipe_id}">
      <figure class="results__fig">
        <img src="${recipe.image_url}" alt="${recipe.title}">
      </figure>
      <div class="results__data">
        <h4 class="results__name">${recipe.title}</h4>
        <p class="results__author">${recipe.publisher}</p>
      </div>
    </a>
  </li>
  `;

elements.searchResList.insertAdjacentHTML('afterbegin', markup);

};

const createButton = (page, type) => {
  return `
  <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    <svg class="search__icon">
      <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
  </button>
  `;
};

const renderButtons = (page, numResult, resPerPage) => {
  // Считаем количество страниц
  const pages = Math.ceil(numResult / resPerPage);
  let button;
  if (page === 1 && pages > 1) {
    // Button to the next page
    button = createButton(page, 'next');
  } else if (page < pages) {
    // Обе кнопки
    button = `
      ${createButton(page, 'prev')}
      ${createButton(page, 'next')}
    `;
  } else if (page === pages) {
    // Кнопка назад
    button = createButton(page, 'prev');
  }

  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResult = (recipes, page = 1, resPerPage = 10) => {
  // перебираем массив рецептов, на каждой итерации добавляя один рецепт в функию
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  // start point 1 - 1 * 10 = 0;
  // end point 1 * 10 = 10;
  // page 2  2 - 1 * 10 = 10;
  // 2 * 10 = 20;

  recipes.slice(start, end).forEach(renderRecipe);

  renderButtons(page, recipes.length, resPerPage);
};
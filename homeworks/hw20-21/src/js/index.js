// Global app controller

import Search from './models/Search.js';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import { elements, renderLoader, clearLoader } from './view/base';
import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import * as listView from './view/listView';
import * as likesView from './view/likesView';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Favorite recipe object
 */

const state = {};

// Search controller

const controlSearch = async () => {
  // 1. получать данные из view
  const query = searchView.getSearchInputValue();

  if (query) {
    // 2. Создаем новый объект Search
    state.search = new Search(query);

    // 3. подготовим UI для результата
    searchView.clearForm();
    searchView.clearResult();
    renderLoader(elements.searchRes);

    // 4. делаем поиск

    await state.search.getResult();

    // 5. render result
    searchView.renderResult(state.search.result);
    clearLoader();
  }
};

// Set events
elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto);
    searchView.clearResult();
    searchView.renderResult(state.search.result, goToPage);
  }
});

// Recipe controller

const controlRecipe = async() => {
  // Get ID from url
  const id = window.location.hash.replace("#", '');

  if(id) {
    if(state.search) searchView.highLightSelected(id);
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // Create new recipe object
    state.recipe = new Recipe(id);

    // Get recipe data
    await state.recipe.getRecipe();
    clearLoader();
    recipeView.renderRecipe(state.recipe.result);
  }
};

// Shopping List controller

if (!state.List) {
  state.List = new List();
}

elements.recipe.addEventListener('click', e => {
  const btn = e.target.closest('.recipe__btn');
  const ingrList = state.recipe.result.ingredients;
  if(btn) {
    ingrList.forEach(function (ingredient) {
      state.List.addItem(ingredient);
    });
    listView.renderList(state.List.result);
  }
});

elements.shoppingList.addEventListener('click', e => {
  if(!e.target.classList.contains('shopping__delete')) {
   return;
  }
  const curItem = e.target.closest('li');
  listView.clearListItem(curItem);
});

// Favorites List controller

const controlLike = () => {
  const curRecipe = state.recipe.result;
  const resId = curRecipe.recipe_id;
  const resAuthor = curRecipe.publisher;
  const resTitle = curRecipe.title;
  const resImg = curRecipe.image_url;
  state.Likes = new Likes(resId, resAuthor, resTitle, resImg);
};

elements.recipe.addEventListener('click', e => {
  const btn = e.target.closest('.recipe__love');
  controlLike();
  if(btn) {
    state.Likes.addLike();
    likesView.renderLikes(state.Likes.result);
  }
});

const loadLike = () => {
  state.Likes = new Likes;
  const res = state.Likes.result;
  likesView.renderLikes(res);
};

elements.likesList.addEventListener('click', e => {
  if(!e.target.classList.contains('likes__delete')) {
    return;
  }
  const curItem = e.target.closest('li');
  const curId = curItem.dataset.id;
  likesView.clearLikesItem(curItem);
  state.Likes.removeLikeFromLocalStorageById(curId);
});

window.addEventListener('hashchange', controlRecipe, loadLike);
window.addEventListener('load', controlRecipe, loadLike);

document.addEventListener('DOMContentLoaded', function (e) {
  loadLike();
});

import { elements } from "./base";
import {createIngredient} from "./recipeView";

export const createListItem = (el) => {
  const markup = `
  <li class="shopping__item" data-id="${el.id}">
    <p class="shopping__description">${el.ingredient}</p>
    <button class="shopping__delete btn-tiny">
    <svg>
    <use href="img/icons.svg#icon-circle-with-cross"></use>
    </svg>
    </button>
    </li>
  `;
  return markup;

};

export const renderList = listItem => {
  const markup = `
   ${listItem.map(el => createListItem(el)).join('')}
 `;

  elements.shoppingList.insertAdjacentHTML('afterbegin', markup);
};

export const clearListItem =  (el) => {
  el.remove();
};
import { elements } from "./base";
import {createListItem} from "./listView";

export const createLikesItem = (el) => {
  const markup = `
    <li data-id="${el.id}">
      <a class="likes__link" href="#${el.id}">
        <figure class="likes__fig">
          <img src="${el.img}" alt="${el.title}">
        </figure>
        <div class="likes__data">
          <h4 class="likes__name">${el.title}</h4>
          <p class="likes__author">${el.author}</p>
        </div>
      </a>
      <button class="likes__delete btn-tiny">
      <svg>
        <use href="img/icons.svg#icon-circle-with-cross"></use>
       </svg>
      </button>
    </li>  
  `;

  return markup;
};

export const renderLikes = listItem => {
  const markup = `
   ${listItem.map(el => createLikesItem(el)).join('')}
 `;

  elements.likesList.insertAdjacentHTML('afterbegin', markup);
};

export const clearLikesItem =  (el) => {
  el.remove();
};
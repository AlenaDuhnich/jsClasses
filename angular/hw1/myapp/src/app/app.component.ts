// импортируются дополнительные модули, сервисы, компоненты
import { Component } from '@angular/core';
// Декоратор, описывает мета-данные о компоненте
@Component({
  selector: 'app-root', // селектор, под которім можно использовать єту компоненту
  templateUrl: './app.component.html', // шаблон, привязанный к компоненте
  styleUrls: ['./app.component.css'] // стили, которые используются в рамках этой компоненты
})
// сама компонента
export class AppComponent {
  // title: string = 'app'; так указіваются типі данніх
  title = 'app';
}

class UI {
  constructor() {
    this.container = document.querySelector(".news-container .container .row");
    this.wrapper = document.querySelector(".login-container .login-wrapper");
  }

  addNews(news, index) {
    const template = `
      <div class="col s12 m6">
          <div class="card left-align">
              <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${news.urlToImage}">
              </div>
              <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${news.title}<i class="material-icons right">more_vert</i></span>
                  <p><a href="${news.url}">Read more</a></p>
                  <button data-index="${index}" class="waves-effect waves-light btn add-favorite">Add favorite</button>
              </div>
              <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">${news.title}<i class="material-icons right">close</i></span>
                  <p>${news.description}</p>
              </div>
          </div>
      </div>
    `;

    this.container.insertAdjacentHTML("beforeend", template);
  }

  addFavoriteNews(news, id) {
    const template = `
      <div class="col s12 m6">
          <div class="card left-align">
              <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${news.urlToImage}">
              </div>
              <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${news.title}<i class="material-icons right">more_vert</i></span>
                  <p><a href="${news.url}">Read more</a></p>
                  <button data-id="${id}" class="waves-effect waves-light red darken-1 btn remove-favorite">Remove favorite</button>
              </div>
              <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">${news.title}<i class="material-icons right">close</i></span>
                  <p>${news.description}</p>
              </div>
          </div>
      </div>
    `;

    this.container.insertAdjacentHTML("beforeend", template);
  }

  removeFavoriteNews(btn) {
    let newsCard = btn.closest('.col');
    newsCard.remove();
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  showLoader() {
    this.clearContainer();

    const template = `
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-blue">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
    `;

    this.container.insertAdjacentHTML("beforeend", template);
  }

  showInfo(msg) {
    this.clearContainer();

    const template = `
      <div class="card blue lighten-4">
        <div class="card-content">
            <p>${msg}</p>
        </div>
      </div>
    `;

    this.container.insertAdjacentHTML("beforeend", template);
  }

  showError(err) {
    this.clearContainer();

    const template = `
      <div class="card red lighten-1">
        <div class="card-content">
            <span class="card-title">Error:</span>
            <p>${err}</p>
        </div>
      </div>
    `;

    this.container.insertAdjacentHTML("beforeend", template);
  }

  showLoginError(error) {

    const template = `
      <div class="card red alert lighten-1">
        <div class="card-content white-text">
            <span class="card-title">Error:</span>
            <p>${error}</p>
        </div>
      </div>
    `;

    this.wrapper.insertAdjacentHTML("afterbegin", template);
  }

  showNews() {
    let timeout = 0;
    const allNews = document.body.querySelectorAll('.news-container .col');
    allNews.forEach((el) => {
      el.style.opacity = 0;
      setTimeout(() => {
        this.animateNews(el);
      }, timeout);
      timeout += 400;
    });
  }

  animateNews(element) {
    let step = 0;

    function animateAction(time) {
      step += 0.1;
      element.style.opacity = step;
      const raf = requestAnimationFrame(animateAction);
      if ((parseFloat(element.style.opacity) >= 1) && (element.style.transform === 'translateY(20px)')) {
        cancelAnimationFrame(raf);
      }
    }
    animateAction();
  }

  createAlert(msg) {
    // check alerts length
    const allAlerts = document.body.querySelectorAll(".alert");
    let fullAllertsHeight = 10;
    if (allAlerts.length) {
      allAlerts.forEach(al => fullAllertsHeight += al.offsetHeight + 10);
    }

    const alert = document.createElement('div');
    alert.classList.add('card', 'red', 'alert', 'white-text');
    alert.textContent = msg;
    alert.style.position = 'fixed';
    alert.style.top = `${fullAllertsHeight}px`;
    alert.style.right = '10px';
    alert.style.opacity = 0;
    alert.style.padding = '20px';
    alert.style.transform = 'translateY(20px)';
    alert.style.zIndex = 2;
    document.body.insertAdjacentElement("afterbegin", alert);

    let timeout = 0;
    setTimeout(() => {
      this.animationElement(alert);
    }, 1000);

    setTimeout(() => {
      alert.remove();
    }, 3000);

  }

  animationElement(element) {
    // шаг изменения своства
    let step = 0, step2 = 0;

    function drawTop(step) {
      element.style.transform = `translateY(${step}px)`;
    }

    function animateAction(time) {
      step += 0.1;
      element.style.opacity = step;
      const raf = requestAnimationFrame(animateAction);
      step2 += 2;
      drawTop(step2);
      // проверяем если opacity < 1 то мы продолжаем делать requestAnimationFrame
      if ((parseFloat(element.style.opacity) >= 1) && (element.style.transform === 'translateY(20px)')) {
        cancelAnimationFrame(raf);
      }
    }

    animateAction();
  }


}
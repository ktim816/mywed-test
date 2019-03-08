/* eslint-disable */
import photosDataBase from '../../data/photos_db';

export default function printPhotos() {
  // Classes
  class Photos {
    constructor(dataBase) {
      this.dataBase = dataBase;
      this.imagePath = './assets/images/';
    }

    getNamesData() {
      return this.dataBase.map(obj => obj.name);
    }

    getCitiesData() {
      return this.dataBase.map(obj => obj.city);
    }

    getImagesData(dpr = '') {
      return this.dataBase
        .map(obj => `${this.imagePath}${obj.src.split('.')[0]}${dpr}.${obj.src.split('.')[1]}`);
    }

    getIdData() {
      return this.dataBase.map(obj => obj.id);
    }
  }

  // Variables
  const photoCards = Array.from(document.querySelectorAll('.js-card'));
  const photoCities = Array.from(document.querySelectorAll('.js-city'));
  const fieldName = document.querySelector('.js-input-name');
  const photoSection = document.querySelector('.js-photos-section');
  const selectCity = document.querySelector('.js-select-city');
  const photos = new Photos(photosDataBase);
  const idArray = JSON.parse(localStorage.getItem('photoId')) || [];
  const filteredCities = [...new Set(photos.getCitiesData())];
  const photoNames = [];

  // Functions
  function initCityOptions() {
    for (let i = 0; i < filteredCities.length; i++) {
      const option = document.createElement('option');
      option.text = filteredCities[i];
      selectCity.add(option);
    }
  }
  initCityOptions();

  // Отображаем сопоставления по городам
  function displayCityMatches() {
    console.log(photoCities);
  }

  // Добавляем элемент в локальное хранилище
  function addToLocalStorage(e) {
    const photoCards = this.querySelectorAll('.js-card');
    photoCards.forEach(card => {
      const invisibleIcon = card.querySelector('.js-invisible');
      if (e.target === invisibleIcon && !idArray.includes(card.dataset.id)) {
        idArray.push(card.dataset.id);
        localStorage.setItem('photoId', JSON.stringify(idArray));
        card.style.display = 'none';
      }
    });
  }

  // Находим сопоставления
  function findMatches(wordToMatch, words) {
    return words.filter((word) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return word.match(regex);
    });
  }

  // Отображаем сопоставления по именам
  function displayNameMatches() {
    const matchArray = findMatches(fieldName.value, photos.getNamesData());
    const html = matchArray.map((name, i) => {
      const regex = new RegExp(fieldName.value, 'gi');
      const photoName = name.replace(regex, `<span class="hl">${fieldName.value}</span>`);

      return `
        <div class="photo-card js-card" data-id="${photos.getIdData()[i]}" data-show="">
            <div class="photo-card__content">
              <button class="photo-card__icon-button js-invisible" title="Больше не показывать">
                <svg class="photo-card__icon">
                  <use xlink:href="assets/images/icon.svg#icon_invisible"></use>
                </svg>
              </button>
              <div class="photo-card__img-block">
                <img class="photo-card__img js-image" src="${photos.getImagesData()[i]}" srcset="${photos.getImagesData('@2x')[i]} 2x, ${photos.getImagesData('@3x')[i]} 3x" alt="Свадебное фото" role="presentation" />
              </div>
              <div class="photo-card__info">
                <div class="photo-card__name">
                <span>Фотограф:&nbsp;</span>
                <span class="js-name">${photoName}</span>
              </div>
              <div class="photo-card__city">
                <span>Город:&nbsp;</span>
                <span class="js-city">${photos.getCitiesData()[i]}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    photoSection.innerHTML = html;
  }

  // Если совпадений нет, выводим сообщение
  function checkIfNoMatches() {
    if (photoSection.children.length === 0) {
      photoSection.innerHTML = `
        <div class="section__note">Сопоставлений не найдено</div>
      `;
    }
  }

  // Event listeners
  photoSection.addEventListener('click', addToLocalStorage);
  window.addEventListener('load', displayNameMatches);
  fieldName.addEventListener('input', displayNameMatches);
  fieldName.addEventListener('keyup', checkIfNoMatches);
}
/* eslint-enable */

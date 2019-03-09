/* eslint-disable */
import photoDataBase from '../../data/photos_db.json';

export default function printPhotos() {
  // -- Classes --
  class Photos {
    constructor(dataBase, cards, names, cities, images, field, select, section, note) {
      this.dataBase = dataBase;
      this.cards = Array.from(document.querySelectorAll(cards));
      this.names = Array.from(document.querySelectorAll(names));
      this.cities = Array.from(document.querySelectorAll(cities));
      this.images = Array.from(document.querySelectorAll(images));
      this.field = document.querySelector(field);
      this.select = document.querySelector(select);
      this.section = document.querySelector(section);
      this.note = document.querySelector(note);
      this.idArray = JSON.parse(localStorage.getItem('photoId')) || [];
      this.imagePath = './assets/images/';
    }

    getIdData() {
      return this.dataBase.map(obj => obj.id);
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

    getCards() {
      return this.cards;
    }

    getNames() {
      return this.names;
    }

    getCities() {
      return this.cities;
    }

    getFilteredCities() {
      return [...new Set(this.getCitiesData())];
    }

    getImages() {
      return this.images;
    }

    getField() {
      return this.field;
    }

    getSelect() {
      return this.select;
    }

    getSection() {
      return this.section;
    }

    getNote() {
      return this.note;
    }
  }

  // -- Variables --
  const photos = new Photos(photoDataBase, '.js-card', '.js-name', '.js-city', '.js-image', '.js-input-name', '.js-select-city', '.js-photos-section', '.js-no-matches');

  // -- Functions --

  // Initialize select options
  (function initCityOptions() {
    for (let i = 0; i < photos.getFilteredCities().length; i++) {
      const option = document.createElement('option');
      option.text = photos.getFilteredCities()[i];
      photos.getSelect().add(option);
    }
  })();

  // Добавляем элемент в локальное хранилище
  function addToLocalStorage(e) {
    photos.getCards().map(card => {
      const invisibleIcon = card.querySelector('.js-invisible');
      if (e.target === invisibleIcon && !photos.idArray.includes(card.id)) {
        photos.idArray.push(card.id);
        localStorage.setItem('photoId', JSON.stringify(photos.idArray));
        card.style.display = 'none';
      }
    });
  }

  // Проверяем, есть ли элемент в локальном хранилище
  function checkIfInLocalStorage() {
    photos.getCards().map(card => {
      if (photos.idArray.includes(card.id)) card.style.display = 'none';
    });
  }

  // Отображаем сопоставления
  function displayMatches() {
    photos.getCards().map(card => {
      const photoName = card.querySelector('.js-name');
      const photoCity = card.querySelector('.js-city');
      if ((photos.getField().value.length !== 0) && (!photoName.innerHTML.includes(photos.getField().value)) || (photos.getSelect().options[0].innerHTML !== photoCity.innerHTML) && (photos.getFilteredCities().includes(photos.getSelect().options[0].innerHTML))) {
        card.classList.add('is-hidden');
      } else {
        card.classList.remove('is-hidden');
      }
    });
  }

  // Если совпадений нет, выводим сообщение
  function checkIfNoMatches() {
    if (photos.getCards().every(card => card.classList.contains('is-hidden'))) {
      photos.getNote().classList.add('is-visible');
    } else {
      photos.getNote().classList.remove('is-visible');
    }
  }

  // Добавляем картинки в srcset
  function addToSourceSet() {
    photos.getImages().map((image, i) => {
      image.srcset = `${photos.getImagesData('@2x')[i]} 2x, ${photos.getImagesData('@3x')[i]} 3x`;
    });
  }

  // -- Event listeners --
  window.addEventListener('load', checkIfInLocalStorage);
  window.addEventListener('load', addToSourceSet);
  photos.getSection().addEventListener('click', addToLocalStorage);
  photos.getField().addEventListener('input', displayMatches);
  photos.getSelect().addEventListener('change', displayMatches);
  photos.getField().addEventListener('input', checkIfNoMatches);
}
/* eslint-enable */

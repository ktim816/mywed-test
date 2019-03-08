/* eslint-disable */
export default function popups() {
  const popup = document.querySelector('.js-popup');
  const popupClose = document.querySelector('.js-popup-close');
  const popupImage = document.querySelector('.js-popup-image');
  const photoSection = document.querySelector('.js-photos-section');

  function showPopup(e) {
    const photoImages = this.querySelectorAll('.js-image');
    photoImages.forEach(image => {
      if (e.target === image) {
        popup.classList.add('is-visible');
        popupImage.src = image.src;
      }
    });
  }

  function closePopup(e) {
    popup.classList.remove('is-visible');
  }

  photoSection.addEventListener('click', showPopup);
  popupClose.addEventListener('click', closePopup);
}
/* eslint-enable */

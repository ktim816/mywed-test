import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
import './globalOptions';
import printPhotos from '../blocks/js-functions/printPhotos';
import { selects } from '../blocks/form-elements/form-elements';
import popups from '../blocks/popups/popups';

const $ = window.$;

$(() => {
  svg4everybody();
  objectFitImages();
  printPhotos();
  selects();
  popups();
});

import FormHandler from './formhandler.js';
import { carTable, session } from './storage.js';
const FILE_SELECTOR = '[data-car="file"]';
const fileSel = document.querySelector(FILE_SELECTOR);
const IMAGE_SELECTOR = '[data-car="image"]';
const imgSel = document.querySelector(IMAGE_SELECTOR);
const ERROR_SELECTOR = '[data-error="text"]';
const errorSel = document.querySelector(ERROR_SELECTOR);
const FORM_SELECTOR = '[data-form="form"]';
const form = document.querySelector(FORM_SELECTOR);
const formHandler = new FormHandler(form);
const reader = new FileReader();
let isCarImage = false;

reader.onloadend = () => {
  imgSel.src = reader.result;
  isCarImage = true;
};

formHandler.addSubmitHandler(data => {
  if (!isCarImage) return (errorSel.textContent = '* no image selected!');
  data.image = imgSel.src;
  data.ownerId = session.get();
  carTable.addToTable(data);
  location.replace('./index.html');
});

fileSel.addEventListener('change', e => {
  const img = fileSel.files[0];
  if (img && img.type.match('image.*')) return reader.readAsDataURL(img);
  imgSel.src = './sample_car';
  isCarImage = false;
});

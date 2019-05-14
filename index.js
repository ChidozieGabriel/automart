import { carTable } from './storage.js';
import { moneyFormat } from './format.js';
import { ClickHandler } from './formhandler.js';

const cars = carTable.getAllFromTableAsArray();
const unsoldCars = cars.filter(car => !car.isSold);
const carListSel = document.querySelector('[data-car="list"]');
// set dynamic view of cars
for (const car of unsoldCars) {
  const cardDiv = document.createElement('div');
  cardDiv.setAttribute('class', 'card');
  cardDiv.setAttribute('data-car', 'card');

  const carImg = document.createElement('img');
  carImg.setAttribute('src', car.image);
  carImg.setAttribute('alt', 'car photo');

  const carSummary = document.createElement('h3');
  carSummary.setAttribute('class', 'summary');
  carSummary.textContent = `${car.color} ${car.make} ${car.model} ${car.year}`;

  const carDescription = document.createElement('span', 'description');
  carDescription.setAttribute('class', 'description');
  carDescription.textContent = car.description;

  const carPrice = document.createElement('span');
  carPrice.setAttribute('class', 'price');
  carPrice.textContent = '₦ ' + moneyFormat(car.price);

  const btn = document.createElement('button');
  btn.setAttribute('data-card', 'button');
  btn.setAttribute('id', car.id);
  btn.textContent = 'view';

  cardDiv.appendChild(carImg);
  cardDiv.appendChild(carSummary);
  cardDiv.appendChild(carDescription);
  cardDiv.appendChild(carPrice);
  cardDiv.appendChild(btn);
  carListSel.appendChild(cardDiv);
}

const btnsSel = document.querySelectorAll('[data-card="button"]');
const clickhandler = new ClickHandler(btnsSel);
clickhandler.addClickHandler(element => {
  const car = carTable.getFromTable(element.id);
  location.href = `./order.html?carId=${car.id}`;
});

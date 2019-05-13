import { UserSession, Table } from './storage.js';
import { ClickHandler } from './formhandler.js';
const userId = new UserSession().get();
const carTable = new Table('cars');
const userCars = Object.values(carTable.getAllFromTable()).filter(
  car => car.ownerId === userId
);
const carListSel = document.querySelector('[data-car="list"]');
// intialize car dom elements
for (const car of userCars) {
  if (car.isSold) continue;
  const cardDiv = document.createElement('div');
  cardDiv.setAttribute('class', 'card');
  cardDiv.setAttribute('data-car', 'card');
  const carImg = document.createElement('img');
  carImg.setAttribute('src', car.image);
  carImg.setAttribute('alt', 'car photo');
  const carSummary = document.createElement('span');
  carSummary.setAttribute('class', 'summary');
  carSummary.textContent = `${car.color} ${car.model} ${car.make} ${car.year}`;
  const soldBtn = document.createElement('button');
  soldBtn.setAttribute('data-card', 'button');
  soldBtn.setAttribute('id', car.id);
  soldBtn.textContent = 'sold';
  cardDiv.appendChild(carImg);
  cardDiv.appendChild(carSummary);
  cardDiv.appendChild(soldBtn);
  carListSel.appendChild(cardDiv);
}
const btnsSel = document.querySelectorAll('[data-card="button"]');
const clickhandler = new ClickHandler(btnsSel);
clickhandler.addClickHandler(element => {
  const car = carTable.getFromTable(element.id);
  car.isSold = true;
  carTable.updateToTable(car);
  element.parentNode.style.display = 'none';
});

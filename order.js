import FormHandler from './formhandler.js';
import { session, userTable, carTable, orderTable } from './storage.js';
import { moneyFormat } from './format.js';
const url = new URL(location.href);
const user = userTable.getFromTable(session.get());
const carId = url.searchParams.get('carId');
const car = carTable.getFromTable(carId);
const owner = userTable.getFromTable(car.ownerId);
const orders = Object.values(orderTable.getAllFromTable());
const order = orders.find(
  obj => obj.orderId === user.id && obj.carId === car.id
);
const isUpdate = url.searchParams.get('isUpdate') || !!order;
const ownerNameSel = document.querySelector('[data-owner="name"]');
const ownerEmailSel = document.querySelector('[data-owner="email"]');
const modelSel = document.querySelector('[data-car="model"]');
const makeSel = document.querySelector('[data-car="make"]');
const yearSel = document.querySelector('[data-car="year"]');
const colorSel = document.querySelector('[data-car="color"]');
const bodySel = document.querySelector('[data-car="bodytype"]');
const mileageSel = document.querySelector('[data-car="mileage"]');
const descriptionSel = document.querySelector('[data-car="description"]');
const priceSel = document.querySelector('[data-car="price"]');
const imgSel = document.querySelector('[data-car="image"]');
const form = document.querySelector('[data-form="form"]');
const buttonSel = document.querySelector('[data-form="button"]');
const bidSel = document.querySelector('[data-form="bidprice"]');
const formHandler = new FormHandler(form);
if (isUpdate) buttonSel.textContent = 'Update Order';
ownerNameSel.textContent = owner.firstname + ' ' + owner.lastname;
ownerEmailSel.textContent = owner.email;
imgSel.src = car.image;
makeSel.textContent = car.make;
modelSel.textContent = car.model;
yearSel.textContent = car.year;
colorSel.textContent = car.color;
bodySel.textContent = car.bodytype || '-';
mileageSel.textContent = (car.mileage && car.mileage + ' km') || '-';
descriptionSel.textContent = car.description || '-';
priceSel.textContent = '₦ ' + moneyFormat(car.price);
bidSel.value = order && isUpdate ? order.bidprice : car.price;

formHandler.addSubmitHandler(data => {
  data.orderId = user.id;
  data.carId = car.id;
  isUpdate ? orderTable.updateToTable(data) : orderTable.addToTable(data);
  setTimeout(() => (location.href = './index.html'));
});

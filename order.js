import FormHandler from './formhandler.js';
import { UserSession, Table } from './storage.js';
const session = new UserSession();
const users = new Table('users');
const user = users.getFromTable(session.get());
const carTable = new Table('cars');
const cars = Object.values(carTable.getAllFromTable());
const car = cars[cars.length - 2]; // Random car
const orderTable = new Table('orders');
const orders = Object.values(orderTable.getAllFromTable());
const order = orders.find(
  obj => obj.orderId === user.id && obj.carId === car.id
);

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
const format = num =>
  (+num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!(\d)))/g, '$1 ');
const url = new URL(location.href);
const isUpdate = url.searchParams.get('isUpdate') || !!order;

if (isUpdate) buttonSel.textContent = 'Update Order';
ownerNameSel.textContent = user.firstname + ' ' + user.lastname;
ownerEmailSel.textContent = user.email;
imgSel.src = car.image;
makeSel.textContent = car.make;
modelSel.textContent = car.model;
yearSel.textContent = car.year;
colorSel.textContent = car.color;
bodySel.textContent = car.bodytype || '-';
mileageSel.textContent = (car.mileage && car.mileage + ' km') || '-';
descriptionSel.textContent = car.description || '-';
priceSel.textContent = '₦ ' + format(car.price);
bidSel.value = order && isUpdate ? order.bidprice : car.price;
debugger;
formHandler.addSubmitHandler(data => {
  data.orderId = user.id;
  data.carId = car.id;
  isUpdate ? orderTable.updateToTable(data) : orderTable.addToTable(data);
  setTimeout(() => (location.href = './index.html'));
});

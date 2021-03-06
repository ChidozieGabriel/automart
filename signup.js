import FormHandler from './formhandler.js';
import { userTable, session } from './storage.js';
const ERROR_SELECTOR = '[data-error="text"]';
const error_sel = document.querySelector(ERROR_SELECTOR);
const FORM_SELECTOR = '[data-form="form"]';
const form = document.querySelector(FORM_SELECTOR);
const formHandler = new FormHandler(form);
formHandler.addSubmitHandler(data => {
  for (const elem of Object.values(data)) {
    if (!elem) return (error_sel.textContent = '* fill all the fields!');
  }
  if (data.password.length <= 6)
    return (error_sel.textContent = '* password must be greater than 6!');
  if (data.password !== data.repassword)
    return (error_sel.textContent = '* password does not match');
  userTable.addToTable(data);
  session.set(data.id);
  location.replace('./index.html');
});

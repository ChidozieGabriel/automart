import FormHandler from "./formhandler.js";
import { Users } from "./storage.js";
const users = new Users();
const FORM_SELECTOR = '[data-form="form"]';
const form = document.querySelector(FORM_SELECTOR);
const formHandler = new FormHandler(form);
formHandler.addSubmitHandler(data => users.addUser(data));

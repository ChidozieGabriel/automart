import FormHandler from "./formhandler.js";
import { Users, UserSession } from "./storage.js";
const users = new Users();
const session = new UserSession();
const ERROR_SELECTOR = '[data-error="text"]';
const error_sel = document.querySelector(ERROR_SELECTOR);
const FORM_SELECTOR = '[data-form="form"]';
const form = document.querySelector(FORM_SELECTOR);
const formHandler = new FormHandler(form);
formHandler.addSubmitHandler(data => {
  if (!data.email) return (error_sel.textContent = "* enter email");
  if (!data.password) return (error_sel.textContent = "* enter password");
  if (!isRegistered(data)) return (error_sel.textContent = "* user not registered!");
  session.set(data.email);
  location.replace("./index.html");
});

const isRegistered = data => {
  const user = users.getUser(data.email);
  return user && user.password === data.password;
};

class Storage {
  constructor(store) {
    this._store = store;
  }

  get() {
    return this._store.getItem(this._key);
  }

  set(value) {
    this._store.setItem(this._key, value);
  }
}

class UserSession extends Storage {
  constructor() {
    super(localStorage);
    this._key = 'usersession';
  }
}

class LocalStorage extends Storage {
  constructor(key) {
    super(localStorage);
    this._key = key;
  }

  setObject(value) {
    this.set(JSON.stringify(value));
  }

  getObject() {
    return JSON.parse(this.get()) || {};
  }
}

class Table extends LocalStorage {
  constructor(table) {
    super(table);
  }

  addToTable(data) {
    const object = this.getObject();
    const id = generateId();
    data.id = id;
    object[id] = data;
    this.setObject(object);
  }

  updateToTable(data) {
    const object = this.getObject();
    object[data.id] = data;
    this.setObject(object);
  }

  getFromTable(id) {
    const object = this.getObject();
    return object[id];
  }

  getAllFromTable() {
    return this.getObject();
  }

  getAllFromTableAsArray() {
    return Object.values(this.getObject());
  }
}

const generateId = () =>
  `${Math.floor(Math.random() * 100)}${Date.now()}${Math.floor(
    Math.random() * 100
  )}`;

export const session = new UserSession();
export const userTable = new Table('users');
export const carTable = new Table('cars');
export const orderTable = new Table('orders');

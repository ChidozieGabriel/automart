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

export class UserSession extends Storage {
  constructor() {
    super(sessionStorage);
    this._key = "usersession";
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

export class Users extends LocalStorage {
  constructor() {
    super("users");
  }

  addUser(data) {
    const users = this.getObject();
    users[data.email] = data;
    this.setObject(users);
  }

  getUser(key) {
    const users = this.getObject();
    return users[key];
  }

  getAllUsers() {
    return this.getObject();
  }
}

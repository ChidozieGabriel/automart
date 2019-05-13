export default class FormHandler {
  constructor(form) {
    this.form = form;
    console.log('here');
  }

  addSubmitHandler(cb) {
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      const data = {};
      for (const elem of this.form) {
        if (elem.name) data[elem.name] = elem.value || null;
      }
      cb(data);
    });
  }
}

export class ClickHandler {
  constructor(selection) {
    this._sel = selection;
  }

  addClickHandler(cb) {
    for (const elem of this._sel) {
      elem.addEventListener('click', function() {
        cb(this);
      });
    }
  }
}

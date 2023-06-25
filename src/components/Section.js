export default class Section {
  constructor({items, renderer}, containerElement) {
this._items = items;
this._renderer = renderer;
this._containerElement = containerElement;
  }

  renderItems() {
this.items.forEach((item)=> {
this._renderer(item);
}); 
}

addItem(element) {
this._containerElement.prepend(element);
}
}

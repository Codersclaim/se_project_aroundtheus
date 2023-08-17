export default class Section {
  constructor({ items, renderer }, containerElement) {
    this._items = items;
    this._renderer = renderer;
    this._containerElement = containerElement;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(newCard) {
    this._containerElement.prepend(newCard);
  }
}

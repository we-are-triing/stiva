class Stiva {
    constructor(stores = {}) {
      this.stores = stores;
      this.context = new EventTarget();
    }
    update(type, store) {
      let newStore = store(this.stores[type]);
      this.stores[type] = newStore;
      this.dispatch(type);
    }
    dispatch(type) {
      this.context.dispatchEvent(
        new CustomEvent(`stiva-${type}`, {
          detail: this.stores[type]
        })
      );
    }
    dispatchAll() {
      Object.keys(this.stores).forEach(store => this.dispatch(store));
    }
    listen(type, handler) {
      this.context.addEventListener(type, handler);
    }
}
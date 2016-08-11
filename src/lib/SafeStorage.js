// @flow

export default class SafeStorage {
  storage: Storage;
  fallback: boolean;
  _data: Object;

  constructor(storage: Storage) {
    this.storage = storage;
    this.fallback = false;
    this._data = {};
  }

  getItem(key: string) : ?string {
    if (this.fallback && key in this._data) return this._data[key];
    try {
      return this.storage.getItem(key);
    } catch (e) {
      this.fallback = true;
      return null;
    }
  }

  setItem(key: string, value: string) : void {
    try {
      this.storage.setItem(key, value);
    } catch (e) {
      this.fallback = true;
    }
    if (this.fallback) this._data[key] = value;
  }

  removeItem(key: string) : void {
    if (this.fallback) delete this._data[key];
    try {
      this.storage.removeItem(key);
    } catch (e) {
      this.fallback = true;
    }
  }

  clear() : void {
    if (this.fallback) this._data = {};
    try {
      this.storage.clear();
    } catch (e) {
      this.fallback = true;
    }
  }
}

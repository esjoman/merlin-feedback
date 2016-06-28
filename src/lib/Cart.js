// @flow

type Id = string | number;

// CartObj is the intermediate form we operate on
type CartObj = {
  [key: Id]: Array<Id>;
};

function addOrPush(object: CartObj, key: Id, values: Array<Id>): CartObj {
  let existing: Array<Id> = object[key] || [];
  return {
    ...object,
    [key]: [...existing, ...values]
  };
}

export default class Cart {
  storage: Storage;
  key: string;

  constructor(storage: Storage, key: string) {
    this.storage = storage;
    this.key = key;
  }

  add(qid: Id, docids: Array<Id>) {
    const currentCart: CartObj = this.get();
    const newCart: CartObj = addOrPush(currentCart, qid, docids);
    this.set(newCart);
  }

  remove() {
    // not implemented
  }

  get(): CartObj {
    const cartString: string = this.storage.getItem(this.key) || '###';
    const qidDocidsAsStringPairs: Array<string> = cartString.split('###');
    return qidDocidsAsStringPairs.reduce((acc: CartObj, qidDocidsAsStringPair: string) => {
      let [qid, docidsAsString]: [string, string] = qidDocidsAsStringPair.split(':');
      return {
        ...acc,
        [qid]: docidsAsString.split(',')
      };
    }, {});
  }

  set(cartObj: CartObj) {
    const qids: Array<string> = Object.keys(cartObj);
    const qidDocIdPairs: Array<string> = qids.map((qid: Id) => `${qid}:${cartObj[qid].join(',')}`);
    const cartString: string = qidDocIdPairs.join('###');
    this.storage.setItem(this.key, cartString);
  }
}

/* global merlinFeedback, expect */

function basicMf(href = 'href test', referrer = 'referrer test') {
  return window.merlinFeedback.init('blackbird', 'dev', 'whiskey', /search/, {href, referrer});
}

function getFromStorage(key) {
  return window.localStorage.getItem(key);
}

function clearLocalStorage() {
  window.localStorage.clear();
}


describe('basic checks', function () {
  before(function () {
    clearLocalStorage();
  });
  it('merlinFeedback should exist on the global object', function () {
    expect(merlinFeedback).to.be.ok();
  });
  it('merlinFeedback should have properties `init`, `Cart`, and `MerlinFeedback`', function () {
    expect(merlinFeedback.init).to.be.ok();
    expect(merlinFeedback.Cart).to.be.ok();
    expect(merlinFeedback.MerlinFeedback).to.be.ok();
  });
  after(function () {
    clearLocalStorage();
  });
});

describe('Cart', function () {
  let mfCart;
  it('should allow instantiation', function () {
    mfCart = new merlinFeedback.Cart(window.localStorage);
    expect(mfCart).to.be.ok();
  });
  it('should allow adding via qid/docids', function () {
    mfCart.add('my_id', ['my', 'doc_ids']);
    expect(mfCart.get()).to.eql({my_id: ['my', 'doc_ids']});
  });
  it('should allow pushing', function () {
    mfCart.add('my_id', ['anotha_one']);
    expect(mfCart.get()).to.eql({my_id: ['my', 'doc_ids', 'anotha_one']});
  });
  it('should handle multiple qids', function () {
    mfCart.add('another_qid', ['some_docid']);
    expect(mfCart.get()).to.eql({
      my_id: ['my', 'doc_ids', 'anotha_one'],
      another_qid: ['some_docid']
    });
  });
});

describe('merlinFeedback instantiation', function () {
  it('should instantiate an object with the `serp`, `click`, `cartAdd`, and `purchase` methods', function () {
    let mf = basicMf();
    expect(mf).to.be.ok();
    expect(mf.serp).to.be.a('function');
    expect(mf.click).to.be.a('function');
    expect(mf.cartAdd).to.be.a('function');
    expect(mf.purchase).to.be.a('function');
  });
  it('should allow setting href and referrer manually', function () {
    let mf = basicMf();
    expect(mf.href).to.be('href test');
    expect(mf.referrer).to.be('referrer test');
  });
});

describe('mf', function () {
  const SERP_URL = 'search?q=dress';
  const ANOTHER_SERP_URL = 'search?q=tops';
  const QID = 'my-qid';
  let href = SERP_URL;
  let mf;
  
  before(function () {
    mf = basicMf(href, null);
    clearLocalStorage();
  });
  it('should, when given a qid, record it in localStorage', function (done) {
    mf.serp({qid: QID}).then(function () {
      let qidFromLocalStorage = localStorage.getItem(mf.href);
      expect(qidFromLocalStorage).to.be(QID);
      done();
    });
  });
  it('mf.serp should GET /feedback/serp', function (done) {
    mf.serp({
      q: 'dress',
      docids: [34893],
      numfound: 203,
      uid: 'davis'
    }).then(function (res) {
      expect(res.status).to.be(200);
      done();
    });
  });
  it('mf.click should grab qid from localStorage by default', function (done) {
    mf.click({docids: [34895]}).then(function (res) {
      expect(res.status).to.be(200);
      done();
    });
  });
  // navigate to a pdp
  it('mf.cartAdd should grab qid from localStorage by default', function (done) {
    mf.referrer = 'search?q=dress';
    mf.href = 'pdp?id=34895';
    Promise.all([
      mf.cartAdd({docids: [34895]}),
      mf.cartAdd({docids: [34899]})
    ]).then(function (responses) {
        responses.forEach(res => expect(res.status).to.be(200));
        done();
    });
  });
  it('mf.cartAdd should handle multiple qids', function () {
    mf.href = ANOTHER_SERP_URL;
    mf.serp();
    mf.click({docids: [28900]});
    mf.referrer = ANOTHER_SERP_URL;
    mf.href = 'pdp?id=28900';
    mf.cartAdd({docids: [28900]});
    expect(getFromStorage('bbcart').split('###').length).to.be(2);
  });
  it('mf.purchase should grab cart from localStorage by default', function (done) {
    mf.referrer = 'pdp?id=34895';
    mf.href = 'checkout';
    mf.purchase().then(function (responses) {
      expect(responses.length).to.be(2);
      done();
    });
  });
});
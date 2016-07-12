/* global merlinFeedback, expect */

function basicMf(href = 'href test', referrer = 'referrer test') {
  const mf = window.merlinFeedback.init('blackbird', 'dev', 'whiskey', /search/);
  mf.handleUrlChanged(referrer);
  mf.handleUrlChanged(href);
  return mf;
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
  it('should allow setting currentHref and previousHref manually', function () {
    let mf = basicMf();
    expect(mf.currentHref).to.be('href test');
    expect(mf.previousHref).to.be('referrer test');
  });
});

describe('mf', function () {
  const SERP_URL = 'search?q=dress';
  const ANOTHER_SERP_URL = 'search?q=tops';
  const QID = 'my-qid';
  let currentHref = SERP_URL;
  let mf;
  
  before(function () {
    mf = basicMf(currentHref, null);
    clearLocalStorage();
  });
  it('should, when given a qid, record it in localStorage', function (done) {
    mf.serp({qid: QID}).then(function () {
      let qidFromLocalStorage = localStorage.getItem(mf.currentHref);
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
    mf.previousHref = 'search?q=dress';
    mf.currentHref = 'pdp?id=34895';
    Promise.all([
      mf.cartAdd({docids: [34895]}),
      mf.cartAdd({docids: [34899]})
    ]).then(function (responses) {
        responses.forEach(res => expect(res.status).to.be(200));
        done();
    });
  });
  it('mf.cartAdd should handle multiple qids', function () {
    mf.currentHref = ANOTHER_SERP_URL;
    mf.serp();
    mf.click({docids: [28900]});
    mf.previousHref = ANOTHER_SERP_URL;
    mf.currentHref = 'pdp?id=28900';
    mf.cartAdd({docids: [28900]});
    expect(getFromStorage('bbcart').split('###').length).to.be(2);
  });
  it('mf.purchase should grab cart from localStorage by default', function (done) {
    mf.previousHref = 'pdp?id=34895';
    mf.currentHref = 'checkout';
    mf.purchase().then(function (responses) {
      expect(responses.length).to.be(2);
      done();
    });
  });

});

describe('useUrlChangeTracker', function () {
  let location, mf;
  before(function () {
    location = window.location.href;
    mf = window.merlinFeedback.init('blackbird', 'dev', 'whiskey', /search/, {useUrlChangeTracker: true});
  });
  it('should keep track of URL when pushState is being used', function (done) {
    // we have this setTimeout stuff because history.pushState calls update asynchronously
    history.pushState({}, '', 'something');
    setTimeout(() => { 
      expect(mf.currentHref).to.match(/something/);
      history.pushState({}, '', 'else');
      setTimeout(() => {
        history.pushState({}, '', 'else');
        setTimeout(() => {
          expect(mf.currentHref).to.match(/else/);
          expect(mf.previousHref).to.match(/something/);
          history.pushState({}, '', 'else'); // should not update hrefs
          setTimeout(() => {
            expect(mf.currentHref).to.match(/else/);
            expect(mf.previousHref).to.match(/something/);
            done();
          }, 0);
        }, 0);
      }, 0);
    }, 0);
  });
  after(function () {
    history.pushState({}, '', location);
  });
});

describe('fallback', function () {
  let mf;
  before(function () {
    mf = window.merlinFeedback.init('blackbird', 'dev', 'whiskey', /search/, {
      fallback: {
        mode: 'proxy',
        url: 'http://test-url.com/proxy'
      },
      useUrlChangeTracker: true
    });
  });
  it('should throw when not given a `fallback.url`', function () {
    expect(function () {
      window.merlinFeedback.init('blackbird', 'dev', 'whiskey', /search/, {fallback: {mode: 'proxy'}});
    }).to.throwError();
  });
  xit('should prepend fallback url to the request url when making requests', function () {
    // this needs a programmatic test
  });
});

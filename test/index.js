/* global merlinFeedback, expect */

function basicMf(href = 'href test', referrer = 'referrer test') {
  return merlinFeedback('blackbird', 'dev', 'whiskey', /search/, {href, referrer});
}

describe('basic checks', () => {
  it('should exist on the global object', () => {
    expect(merlinFeedback).to.be.ok();
  });
});

describe('merlinFeedback instantiation', () => {
  it('should instantiate an object with the `serp`, `click`, `cartAdd`, and `purchase` methods', () => {
    let mf = basicMf();
    expect(mf).to.be.ok();
    expect(mf.serp).to.be.a('function');
    expect(mf.click).to.be.a('function');
    expect(mf.cartAdd).to.be.a('function');
    expect(mf.purchase).to.be.a('function');
  });
  it('should allow setting href and referrer manually', () => {
    let mf = basicMf();
    expect(mf.href).to.be('href test');
    expect(mf.referrer).to.be('referrer test');
  });
});

describe('mf', () => {
  let href = 'search?q=dress';
  let mf = basicMf(href, null);
  const QID = 'my-qid';
  it('should, when given a qid, record it in localStorage', (done) => {
    mf.serp({qid: QID}).then(_res => {
      let qidFromLocalStorage = localStorage.getItem(href);
      expect(qidFromLocalStorage).to.be(QID);
      done();
    });
  });
  it('mf.serp should GET /feedback/serp', (done) => {
    mf.serp({
      q: 'dress',
      docids: [34893],
      numfound: 203,
      uid: 'davis'
    }).then(res => {
      expect(res.status).to.be(200);
      done();
    });
  });
  it('mf.click should grab qid from localStorage by default', (done) => {
    mf.click({
      docids: [34895]
    }).then(_res => {
      console.log(_res)
      done();
    });
  });
});
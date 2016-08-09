'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var yearCtrlStub = {
  index: 'yearCtrl.index',
  show: 'yearCtrl.show',
  create: 'yearCtrl.create',
  update: 'yearCtrl.update',
  destroy: 'yearCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var yearIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './year.controller': yearCtrlStub
});

describe('Year API Router:', function() {

  it('should return an express router instance', function() {
    expect(yearIndex).to.equal(routerStub);
  });

  describe('GET /api/years', function() {

    it('should route to year.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'yearCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/years/:id', function() {

    it('should route to year.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'yearCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/years', function() {

    it('should route to year.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'yearCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/years/:id', function() {

    it('should route to year.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'yearCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/years/:id', function() {

    it('should route to year.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'yearCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/years/:id', function() {

    it('should route to year.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'yearCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});

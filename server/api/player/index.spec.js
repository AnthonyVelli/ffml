'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var playerCtrlStub = {
  index: 'playerCtrl.index',
  show: 'playerCtrl.show',
  create: 'playerCtrl.create',
  update: 'playerCtrl.update',
  destroy: 'playerCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var playerIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './player.controller': playerCtrlStub
});

describe('Player API Router:', function() {

  it('should return an express router instance', function() {
    expect(playerIndex).to.equal(routerStub);
  });

  describe('GET /api/players', function() {

    it('should route to player.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'playerCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/players/:id', function() {

    it('should route to player.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'playerCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/players', function() {

    it('should route to player.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'playerCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/players/:id', function() {

    it('should route to player.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'playerCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/players/:id', function() {

    it('should route to player.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'playerCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/players/:id', function() {

    it('should route to player.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'playerCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});

'use strict';

var app = require('../..');
import request from 'supertest';

var newPlayer;

describe('Player API:', function() {

  describe('GET /api/players', function() {
    var players;

    beforeEach(function(done) {
      request(app)
        .get('/api/players')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          players = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(players).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/players', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/players')
        .send({
          name: 'New Player',
          info: 'This is the brand new player!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPlayer = res.body;
          done();
        });
    });

    it('should respond with the newly created player', function() {
      expect(newPlayer.name).to.equal('New Player');
      expect(newPlayer.info).to.equal('This is the brand new player!!!');
    });

  });

  describe('GET /api/players/:id', function() {
    var player;

    beforeEach(function(done) {
      request(app)
        .get('/api/players/' + newPlayer._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          player = res.body;
          done();
        });
    });

    afterEach(function() {
      player = {};
    });

    it('should respond with the requested player', function() {
      expect(player.name).to.equal('New Player');
      expect(player.info).to.equal('This is the brand new player!!!');
    });

  });

  describe('PUT /api/players/:id', function() {
    var updatedPlayer;

    beforeEach(function(done) {
      request(app)
        .put('/api/players/' + newPlayer._id)
        .send({
          name: 'Updated Player',
          info: 'This is the updated player!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPlayer = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPlayer = {};
    });

    it('should respond with the updated player', function() {
      expect(updatedPlayer.name).to.equal('Updated Player');
      expect(updatedPlayer.info).to.equal('This is the updated player!!!');
    });

  });

  describe('DELETE /api/players/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/players/' + newPlayer._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when player does not exist', function(done) {
      request(app)
        .delete('/api/players/' + newPlayer._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});

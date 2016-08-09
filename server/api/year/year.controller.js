/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/years              ->  index
 * POST    /api/years              ->  create
 * GET     /api/years/:id          ->  show
 * PUT     /api/years/:id          ->  update
 * DELETE  /api/years/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Year} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Years
export function index(req, res) {
  return Year.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Year from the DB
export function show(req, res) {
  return Year.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Year in the DB
export function create(req, res) {
  return Year.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Year in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Year.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Year from the DB
export function destroy(req, res) {
  return Year.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

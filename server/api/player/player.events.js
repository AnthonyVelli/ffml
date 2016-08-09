/**
 * Player model events
 */

'use strict';

import {EventEmitter} from 'events';
var Player = require('../../sqldb').Player;
var PlayerEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PlayerEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Player.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    PlayerEvents.emit(event + ':' + doc._id, doc);
    PlayerEvents.emit(event, doc);
    done(null);
  }
}

export default PlayerEvents;

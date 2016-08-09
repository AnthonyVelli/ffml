/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Year = db.sequelize.import('../api/year/year.model');
db.Player = db.sequelize.import('../api/player/player.model');
db.User = db.sequelize.import('../api/user/user.model');
db.Player.hasMany(db.Year);
db.Year.belongsTo(db.Player);
module.exports = db;

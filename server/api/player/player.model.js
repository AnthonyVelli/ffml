'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Player', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    name_info: DataTypes.STRING,
    position: DataTypes.STRING,
    birthyear: DataTypes.INTEGER
  });
}

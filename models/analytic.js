'use strict';
module.exports = (sequelize, DataTypes) => {
  var Analytic = sequelize.define('Analytic', {
    user_id: DataTypes.INTEGER,
    page_id: DataTypes.INTEGER,
    object_id: DataTypes.INTEGER
  }, {
    tableName: 'analytic',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Analytic;
};

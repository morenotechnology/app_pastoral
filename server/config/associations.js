const Leader = require('./leader');
const Church = require('./church');
const Pastor = require('./pastor');

// Definir relaciones
Leader.belongsTo(Church, { foreignKey: 'church_id' });
Church.hasMany(Leader, { foreignKey: 'church_id' });

Church.belongsTo(Pastor, { foreignKey: 'pastor_id' });
Pastor.hasOne(Church, { foreignKey: 'pastor_id' });

module.exports = { Leader, Church, Pastor };

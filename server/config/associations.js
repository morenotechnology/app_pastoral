const Leader = require('./leader');
const Church = require('./church');
const Pastor = require('./pastor');
const SurveyModel = require('./SurveyModel'); // Importar SurveyModel
const SurveyQuestion = require('./SurveyQuestion');

// Definir relaciones entre Leader, Church y Pastor
Leader.belongsTo(Church, { foreignKey: 'church_id' });
Church.hasMany(Leader, { foreignKey: 'church_id' });

Church.belongsTo(Pastor, { foreignKey: 'pastor_id' });
Pastor.hasOne(Church, { foreignKey: 'pastor_id' });

// Definir relaciones entre Leader y SurveyModel
Leader.hasMany(SurveyModel, { foreignKey: 'leader_id' });
SurveyModel.belongsTo(Leader, { foreignKey: 'leader_id' });

module.exports = { Leader, Church, Pastor, SurveyModel };
// Relación entre SurveyQuestion y SurveyArea
SurveyQuestion.belongsTo(SurveyArea, { foreignKey: 'area_id' });
SurveyArea.hasMany(SurveyQuestion, { foreignKey: 'area_id' });
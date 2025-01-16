const Leader = require('../models/leader');
const Church = require('../models/church');
const Pastor = require('../models/pastor');
const SurveyModel = require('../models/SurveyModel');
const SurveyQuestion = require('../models/SurveyQuestion');
const SurveyOption = require('../models/SurveyOption');
const SurveyArea = require('../models/SurveyArea');
const SurveyAnswer = require('../models/SurveyAnswer'); // Importar SurveyAnswer desde models

// Relaciones entre Leader, Church y Pastor
Leader.belongsTo(Church, { foreignKey: 'church_id' });
Church.hasMany(Leader, { foreignKey: 'church_id' });

Church.belongsTo(Pastor, { foreignKey: 'pastor_id' });
Pastor.hasOne(Church, { foreignKey: 'pastor_id' });

// Relación entre Leader y SurveyModel
Leader.hasMany(SurveyModel, { foreignKey: 'leader_id' });
SurveyModel.belongsTo(Leader, { foreignKey: 'leader_id' });

// Relación entre SurveyQuestion y SurveyArea
SurveyQuestion.belongsTo(SurveyArea, { foreignKey: 'area_id' });
SurveyArea.hasMany(SurveyQuestion, { foreignKey: 'area_id' });

// Relación: Una pregunta tiene muchas opciones
SurveyQuestion.hasMany(SurveyOption, { foreignKey: 'question_id', as: 'SurveyOptions' });
SurveyOption.belongsTo(SurveyQuestion, { foreignKey: 'question_id' });

// Relación: Una encuesta tiene muchas respuestas
SurveyModel.hasMany(SurveyAnswer, { foreignKey: 'survey_id' });
SurveyAnswer.belongsTo(SurveyModel, { foreignKey: 'survey_id' });

// Relación: Una pregunta tiene muchas respuestas
SurveyQuestion.hasMany(SurveyAnswer, { foreignKey: 'question_id' });
SurveyAnswer.belongsTo(SurveyQuestion, { foreignKey: 'question_id' });

// Relación: Una opción tiene muchas respuestas
SurveyOption.hasMany(SurveyAnswer, { foreignKey: 'option_id' });
SurveyAnswer.belongsTo(SurveyOption, { foreignKey: 'option_id' });

module.exports = {
    Leader,
    Church,
    Pastor,
    SurveyModel,
    SurveyQuestion,
    SurveyOption,
    SurveyArea,
    SurveyAnswer // Exportar SurveyAnswer
};

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './survey.css';

function Survey() {
    const { id: surveyId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState({});
    const [leader, setLeader] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [currentAreaIndex, setCurrentAreaIndex] = useState(0);

    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                // Fetch survey questions
                const questionsResponse = await fetch(`http://localhost:3000/api/surveys/${surveyId}/questions`);
                if (!questionsResponse.ok) {
                    throw new Error('Error al cargar las preguntas de la encuesta');
                }
                const questionsData = await questionsResponse.json();
                setQuestions(questionsData.questions);

                // Fetch leader data
                const leaderResponse = await fetch(`http://localhost:3000/api/surveys/${surveyId}/leader`);
                if (!leaderResponse.ok) {
                    throw new Error('Error al cargar los datos del líder');
                }
                const leaderData = await leaderResponse.json();
                setLeader({ name: leaderData.leader.name, committee: leaderData.leader.committee });
            } catch (error) {
                console.error('Error al cargar los datos:', error);
                setError('No se pudo cargar la encuesta. Inténtalo de nuevo más tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchSurveyData();
    }, [surveyId]);

    const handleOptionChange = (questionId, optionId, multiple = false) => {
        setResponses((prevResponses) => {
            if (multiple) {
                const options = prevResponses[questionId] || [];
                if (options.includes(optionId)) {
                    return {
                        ...prevResponses,
                        [questionId]: options.filter((id) => id !== optionId),
                    };
                } else {
                    return {
                        ...prevResponses,
                        [questionId]: [...options, optionId],
                    };
                }
            } else {
                return {
                    ...prevResponses,
                    [questionId]: optionId,
                };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const responsesArray = Object.entries(responses).flatMap(([questionId, optionIds]) => {
            if (Array.isArray(optionIds)) {
                return optionIds.map((optionId) => ({
                    questionId: parseInt(questionId),
                    optionId,
                }));
            } else {
                return {
                    questionId: parseInt(questionId),
                    optionId: optionIds,
                };
            }
        });

        try {
            const response = await fetch(`http://localhost:3000/api/surveys/${surveyId}/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ responses: responsesArray }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar las respuestas');
            }

            setSuccessMessage('Respuestas enviadas correctamente');
        } catch (error) {
            console.error('Error al enviar las respuestas:', error);
            alert('No se pudo enviar las respuestas. Inténtalo de nuevo más tarde.');
        }
    };

    const groupedQuestions = questions.reduce((groups, question) => {
        const area = getAreaName(question.area_id);
        if (!groups[area]) {
            groups[area] = [];
        }
        groups[area].push(question);
        return groups;
    }, {});

    const areaKeys = Object.keys(groupedQuestions);
    const currentArea = areaKeys[currentAreaIndex];
    const isLastArea = currentAreaIndex === areaKeys.length - 1;

    const handleNextArea = () => {
        // Verifica si todas las preguntas del área actual tienen respuestas
        const currentAreaQuestions = groupedQuestions[currentArea];
        const allAnswered = currentAreaQuestions.every((question) => {
            const response = responses[question.id];
            if (Array.isArray(response)) {
                return response.length > 0;
            }
            return response !== undefined && response !== null;
        });
    
        if (!allAnswered) {
            alert('Por favor, responda todas las preguntas antes de continuar.');
            return;
        }
    
        if (currentAreaIndex < areaKeys.length - 1) {
            setCurrentAreaIndex((prevIndex) => prevIndex + 1);
        }
    };
    

    const handlePrevArea = () => {
        if (currentAreaIndex > 0) {
            setCurrentAreaIndex((prevIndex) => prevIndex - 1);
        }
    };

    if (loading) {
        return (
            <div className="survey-container">
                <h1>HERRAMIENTA ADMINISTRATIVA PARA LA ELABORACIÓN DE DIAGNÓSTICOS</h1>
                <p>Cargando encuesta...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="survey-container">
                <h1>HERRAMIENTA ADMINISTRATIVA PARA LA ELABORACIÓN DE DIAGNÓSTICOS</h1>
                <p>{error}</p>
            </div>
        );
    }

    const renderDoctrinaTable = () => {
        const doctrinaQuestionConoce = questions.find(q => q.id === 11);
        const doctrinaQuestionBases = questions.find(q => q.id === 12);

        const doctrinaOptionsConoce = doctrinaQuestionConoce ? doctrinaQuestionConoce.SurveyOptions : [];
        const doctrinaOptionsBases = doctrinaQuestionBases ? doctrinaQuestionBases.SurveyOptions : [];

        return (
            <div>
                <h2>Área de Doctrinas Fundamentales</h2>
                <table className="doctrina-table">
                    <thead>
                        <tr>
                            <th>Doctrina</th>
                            <th>Conoce la Doctrina</th>
                            <th>Conoce las Bases Bíblicas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctrinaOptionsConoce.map((option, index) => (
                            <tr key={option.id} className="doctrina-row">
                                <td>{option.option_text}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        name={`doctrina-${option.id}-conoce`}
                                        value={option.id}
                                        onChange={() => handleOptionChange(11, option.id, true)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        name={`doctrina-${option.id}-bases`}
                                        value={option.id}
                                        onChange={() => handleOptionChange(12, option.id, true)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderGroupedQuestions = () => {
        if (currentArea === 'Área de Doctrinas Fundamentales') {
            return renderDoctrinaTable();
        }

        return (
            <ul>
                {groupedQuestions[currentArea].map((question, index) => (
                    <li key={question.id} className="survey-question">
                        <span className="question-number">{index + 1}. </span>
                        <span className="question-text">{question.question}</span>
                        <ul className="options-list">
                            {question.SurveyOptions.map((option) => (
                                <li key={option.id} className="option-item">
                                    <label>
                                        <input
                                            type={question.id === 8 || question.id === 9 || question.id === 19 || question.id === 30 || question.id === 36 || question.id === 38 ? 'checkbox' : 'radio'}
                                            name={`question-${question.id}${question.id === 8 || question.id === 9 || question.id === 19 || question.id === 30 || question.id === 36 || question.id === 38 ? `-${option.id}` : ''}`}
                                            value={option.id}
                                            onChange={() => handleOptionChange(question.id, option.id, question.id === 8 || question.id === 9 || question.id === 19 || question.id === 30 || question.id === 36 || question.id === 38)}
                                            required={!(question.id === 8 || question.id === 9 || question.id === 19 || question.id === 30 || question.id === 36 || question.id === 38)}
                                        />
                                        {option.option_text}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="survey-container">
            <h1>HERRAMIENTA ADMINISTRATIVA PARA LA ELABORACIÓN DE DIAGNÓSTICOS</h1>
            <div className="survey-header">
                <p><strong>Nombre del Líder:</strong> {leader.name}</p>
                <p><strong>Comité:</strong> {leader.committee}</p>
                <p>La Iglesia Pentecostal Unida de Colombia – IPUC, realiza esta encuesta AUTODILIGENCIADA con el propósito de conocer las percepciones, experiencias y necesidades de la feligresía, a partir de las actividades y planes desarrollados en las iglesias locales y así identificar oportunidades de mejora.</p>
                <p>Su participación es voluntaria y las respuestas suministradas serán de carácter anónimo y confidencial. Los datos se utilizarán únicamente para fines estadísticos.</p>
                <p>Le agradecemos su tiempo y disposición para responder con total honestidad. Diligenciar esta encuesta le tomará cerca de 10 minutos APROX.</p>
                <p><strong>LEA ATENTAMENTE CADA PREGUNTA Y SELECCIONE LA OPCIÓN DE RESPUESTA SEGÚN SU PERCEPCIÓN. ¡Su opinión cuenta!</strong></p>
            </div>
            <form onSubmit={handleSubmit} className="survey-form">
                <div className="area-section">
                    <h2>{currentArea}</h2>
                    {renderGroupedQuestions()}
                </div>
                <div className="navigation-buttons">
                    {currentAreaIndex > 0 && (
                        <button type="button" className="back-button" onClick={handlePrevArea}>Atrás</button>
                    )}
                    {!isLastArea ? (
                        <button type="button" className="next-button" onClick={handleNextArea}>Siguiente</button>
                    ) : (
                        <button type="submit" className="submit-button">Enviar respuestas</button>
                    )}
                </div>
                {successMessage && <p className="success-message">{successMessage}</p>}
                <div className="progress-indicator" style={{ marginTop: '10px' }}>Área {currentAreaIndex + 1} de {areaKeys.length}</div>
            </form>
        </div>
    );
}

function getAreaName(areaId) {
    const areas = {
        1: 'Área Espiritual',
        2: 'Área de Eventos Espirituales',
        3: 'Área de Doctrinas Fundamentales',
        4: 'Área de Acompañamiento para el Crecimiento Espiritual',
        5: 'Área Social',
        6: 'Área de Servicio a Dios',
        7: 'Área Administrativa y Financiera',
    };
    return areas[areaId] || 'Área Desconocida';
}

export default Survey;

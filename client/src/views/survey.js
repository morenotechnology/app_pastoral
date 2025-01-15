import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Survey() {
    const { id: surveyId } = useParams(); // Obtener el surveyId desde la URL
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/surveys/${surveyId}/questions`);
                if (!response.ok) {
                    throw new Error('Error al cargar la encuesta');
                }
                const data = await response.json();
                console.log('Preguntas recibidas:', data.questions);
                setQuestions(data.questions);
            } catch (error) {
                console.error('Error al cargar la encuesta:', error);
                setError('No se pudo cargar la encuesta. Inténtalo de nuevo más tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchSurveyData();
    }, [surveyId]);

    if (loading) {
        return (
            <div>
                <h1>Encuesta</h1>
                <p>Cargando encuesta...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1>Encuesta</h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Encuesta</h1>
            <form>
                <ul>
                    {questions.map((question) => (
                        <li key={question.id}>
                            <label>{question.question}</label>
                            <input
                                type="text"
                                name={`question-${question.id}`}
                                placeholder="Escribe tu respuesta aquí"
                                required
                            />
                        </li>
                    ))}
                </ul>
                <button type="submit">Enviar respuestas</button>
            </form>
        </div>
    );
}

export default Survey;

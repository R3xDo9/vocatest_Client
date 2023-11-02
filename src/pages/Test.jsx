import '../css/Test.css'
import { useFetch } from '../useFetch.js';
import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { Route, Routes, useNavigate} from 'react-router-dom'

const initialAreaCounts = {
  "Arte y Creatividad": 0,
  "Ciencias Sociales": 0,
  "Economía, Administración y Finanzas": 0,
  "Ciencia y Tecnologia": 0,
  "Ciencias de la Salud": 0,
  "Ciencias Ecológicas y Ambientales": 0
};

const HeaderTest=()=>{
  return(
    <div className="header-test">
       <h1>Test vocacional</h1>
       <p>Es hora de responder unas preguntas para definir tu futuro</p>
    </div>
  )
}
const Test = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch('https://vocatest-api.3.us-1.fl0.io/questions');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  
  const [areaCounts, setAreaCounts] = useState(initialAreaCounts);
  useEffect(() => {
    const allAnswered = data?.every((question) => selectedAnswers[question.id] !== undefined);
    setAllQuestionsAnswered(allAnswered);
  }, [data, selectedAnswers]);

  const handleRadioChange = (questionId, answer, area) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));

    setAreaCounts((prevCounts) => ({
      ...prevCounts,
      [area]: answer ? prevCounts[area] + 1 : Math.max(prevCounts[area] - 1, 0),
    }));
  };

  const postAnswers = () => {
    fetch('https://vocatest-api.3.us-1.fl0.io/respuestas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(areaCounts),
    })
      .then((response) => response.json())
      .then((data) => {
        // Aquí puedes manejar la re spuesta del servidor si es necesario
        console.log('Respuesta del servidor:', data)
        if (data && data._id) {
          navigate(`/results/${data._id}`);
        } else {
          console.log('No hay datos?');
        }
      })
      .catch((error) => {
        console.error('Error al enviar respuestas:', error);
      });
  };

  const handleSaveAnswers = () => {
    if (allQuestionsAnswered) {
      console.log('Respuestas subidas con éxito.');
      // Realizar la solicitud POST al servidor
      postAnswers()
    } else {
      alert('Aún falta responder preguntas.');
    }
  };

  return (
    <div className='bodyTest'>
      <HeaderTest/>
      <div className='questions'>
        {error && <div className="error"><h2>X..Error:{error}..X</h2></div>}
        {loading && <div className="question-header"><h2>Loading...</h2></div>}
        {data?.map((question) => (
          <div
            className={`question-header ${
              selectedAnswers[question.id] === true
                ? 'green-background'
                : selectedAnswers[question.id] === false
                ? 'red-background'
                : ''
            }`}
            key={question.id}
          >
            <div className="p-id">
              <p><b>{question.id}.</b></p>
            </div>
            <div className='p-header'>
              <p>{question.question}</p>
            </div>
            <form className='answers'>
              <div className='radiobutton'>
                <input
                  type="radio"
                  id={`yes-${question.id}`}
                  name={`yesno-${question.id}`}
                  value={true}
                  onChange={() => handleRadioChange(question.id, true, question.area)}
                />
                <label htmlFor={`yes-${question.id}`}>SI</label>
              </div>
              <div className='radiobutton'>
                <input
                  type="radio"
                  id={`no-${question.id}`}
                  name={`yesno-${question.id}`}
                  value={false}
                  onChange={() => handleRadioChange(question.id, false, question.area)}
                />
                <label htmlFor={`no-${question.id}`}>NO</label>
              </div>
            </form>
          </div>
        ))}
        <button onClick={handleSaveAnswers} disabled={!allQuestionsAnswered} className={`updateAnswers ${allQuestionsAnswered ? "enabled" : ""}`}>
            Subir Respuestas
        </button>
      </div>
    </div>
  );
};

function AppTest(){
  return(
    <>
      <Test/>
    </>
  )
}

export default AppTest;

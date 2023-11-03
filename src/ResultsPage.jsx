import { useParams } from 'react-router-dom';
import { useFetch } from './useFetch.js';

import './ResultsPage.css';
import ProgramasU from './ProgramasU';

const ResultsPage = () => {
  const { id } = useParams(); // Obtener el parámetro de la URL
  // eslint-disable-next-line no-unused-vars
  const { data, loading, error } = useFetch(`https://vocatest-api.3.us-1.fl0.io/respuestas/${id}`);
  // Función para obtener las dos áreas con mayor puntaje
  const getTopTwoAreas = (responseData) => {
    // Obtener las áreas y puntajes como pares clave-valor
    const areaScores = Object.entries(responseData)
      // eslint-disable-next-line no-unused-vars
      .filter(([key, value]) => typeof value === 'number'); // Filtrar solo pares con valores numéricos

    // Ordenar las áreas por puntaje en orden descendente
    areaScores.sort((a, b) => b[1] - a[1]);

    // Tomar las dos primeras áreas después de ordenar
    const topTwoAreas = areaScores.slice(0, 2);

    return topTwoAreas;
  };

  const topTwoAreas = data ? getTopTwoAreas(data) : [];

  // Renderizar los resultados cuando estén disponibles
  return (
    <div className="results-page">
      <h1>Resultados del Test</h1>
      {data ? (
        <div>
          <p>Arte y Creatividad: {data['Arte y Creatividad']}</p>
          <p>Ciencias Sociales: {data['Ciencias Sociales']}</p>
          <p>Economía, Administración y Finanzas: {data['Economía, Administración y Finanzas']}</p>
          <p>Ciencia y Tecnología: {data['Ciencia y Tecnologia']}</p>
          <p>Ciencias de la Salud: {data['Ciencias de la Salud']}</p>
          <p>Ciencias Ecológicas y Ambientales: {data['Ciencias Ecológicas y Ambientales']}</p>
          <div className='top-areas'>
            <h2>Hora de ver las dos areas que mas se acojen a ti</h2>
            <hr />
          {topTwoAreas.map(([area, score]) => (
              <div key={area}>
                <h3>{area}: {score}</h3>
                <ProgramasU area={
                    area=='Arte y Creatividad'?'Bellas%20Artes':
                    area=='Ciencias Sociales'?'Ciencias%20sociales%20y%20humanas':
                    area=='Economía, Administración y Finanzas'?'Economía,%20administración,%20contaduría%20y%20afines':
                    area=='Ciencia y Tecnologia'?'Matemáticas%20y%20ciencias%20naturales':
                    area=='Ciencias de la Salud'?'Ciencias%20de%20la%20salud':
                    area=='Ciencias Ecológicas y Ambientales'?'Agronomía,%20veterinaria%20y%20afines':
                    ''
                    }/>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Cargando resultados...</p>
      )}
    </div>
  );
}
export default ResultsPage;
// Economía, administración, contaduría y afines: 7783 programas
// Ciencias sociales y humanas: 4032 programas
// Ingeniería, arquitectura, urbanismo y afines: 6060 programas
// Bellas artes: 1187 programas
// Matemáticas y ciencias naturales: 710 programas
// Agronomía, veterinaria y afines: 693 programas
// Ciencias de la salud: 2069 programas
// Ciencias de la educación: 3103 programas
// Sin clasificar: 2519 programas
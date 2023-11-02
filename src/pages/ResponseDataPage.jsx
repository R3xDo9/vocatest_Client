import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useFetch } from '../useFetch.js';
import {useNavigate} from 'react-router-dom'

import '../css/ResponseDataPage.css';

const ResponseDataPage = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch('https://vocatest-api.3.us-1.fl0.io/respuestas');
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(5); // Número de resultados por página

  // Función para manejar el cambio de página
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Calcula el índice del primer y último elemento en la página actual
  const indexOfLastResult = (currentPage + 1) * perPage;
  const indexOfFirstResult = indexOfLastResult - perPage;
  const currentResults = data ? data.slice(indexOfFirstResult, indexOfLastResult) : [];

  return (
    <div className='results'>
      <h1>Respuestas</h1>
      {error && <div className="error"><h2>X..Error:{error}..X</h2></div>}
      {loading && <div className="question-header"><h2>Loading...</h2></div>}
      <div className="tableResults-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Arte y Creatividad</th>
            <th>Ciencias Sociales</th>
            <th>Economía, Administración y Finanzas</th>
            <th>Ciencia y Tecnología</th>
            <th>Ciencias de la Salud</th>
            <th>Ciencias Ecológicas y Ambientales</th>
            <th>Fecha</th>
            {/* Agrega más encabezados de columnas según tus datos */}
          </tr>
        </thead>
        <tbody>
          {currentResults.map((response) => (
            <tr key={response._id} onClick={()=>{
              navigate(`/results/${response._id}`);
            }}>
              <td>{response._id}</td>
              <td>{response['Arte y Creatividad']}</td>
              <td>{response['Ciencias Sociales']}</td>
              <td>{response['Economía, Administración y Finanzas']}</td>
              <td>{response['Ciencia y Tecnologia']}</td>
              <td>{response['Ciencias de la Salud']}</td>
              <td>{response['Ciencias Ecológicas y Ambientales']}</td>
              <td>{response['date']}</td>
              {/* Agrega más celdas de datos según tus datos */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="pagination">
        {data && data.length > perPage && (
          <ReactPaginate
            pageCount={Math.ceil(data.length / perPage)}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        )}
      </div>
    </div>
  );
};

export default ResponseDataPage;

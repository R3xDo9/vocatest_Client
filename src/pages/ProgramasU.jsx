import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useFetch } from '../useFetch.js';

import '../css/ProgramasU.css';

const ProgramasU = (params) => {
  const isParamsEmpty = Object.keys(params).length === 0;
  const url = isParamsEmpty
    ? 'https://vocatest-api.3.us-1.fl0.io/programas'
    : `https://vocatest-api.3.us-1.fl0.io/programas?area=${params.area}`;
  const { data, loading, error } = useFetch(url)
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
    <div className='results-data'>
      {error && <div className="error"><h2>X..Error:{error}..X</h2></div>}
      {loading && <div className="question-header"><h2>Loading...</h2></div>}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>CÓDIGO <br/>INSTITUCIÓN</th>
              <th>NOMBRE <br/>INSTITUCIÓN</th>
              <th>CARÁCTER <br/>ACADÉMICO</th>
              <th>SECTOR</th>
              <th>CÓDIGO <br/>SNIES</th>
              <th>PROGRAMA</th>
              <th>ESTADO<br/>PROGRAMA</th>
              <th>ÁREA DE <br/>CONOCIMIENTO</th>
              <th>NIVEL <br/>ACADÉMICO</th>
              <th>MODALIDAD</th>
              {/* Agrega más encabezados de columnas según tus datos */}
            </tr>
          </thead>
          <tbody>
            {currentResults.map((response) => (
              <tr key={response['CÓDIGO_SNIES_DEL_PROGRAMA']}>
                <td>{response['CÓDIGO_INSTITUCIÓN']}</td>
                <td>{response['NOMBRE_INSTITUCIÓN']}</td>
                <td>{response['CARÁCTER_ACADÉMICO']}</td>
                <td>{response['SECTOR']}</td>
                <td>{response['CÓDIGO_SNIES_DEL_PROGRAMA']}</td>
                <td>{response['NOMBRE_DEL_PROGRAMA']}</td>
                <td>{response['ESTADO_PROGRAMA']}</td>
                <td>{response['ÁREA_DE_CONOCIMIENTO']}</td>
                <td>{response['NIVEL_ACADÉMICO']}</td>
                <td>{response['MODALIDAD']}</td>
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


export default ProgramasU;

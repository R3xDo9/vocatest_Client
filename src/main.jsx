import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ResultsPage from './ResultsPage.jsx';
import AppTest from './Test.jsx';
import ResponseDataPage from './ResponseDataPage.jsx';
import Directory from './Directory.jsx';
import { Route, Routes,  BrowserRouter} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
        <Route path='/' element={<App/>}/> 
        <Route path='/test' element={<AppTest/>}/>
        <Route path='/respuestas-data' element={<ResponseDataPage/>} />
        <Route path='/results/:id' element={<ResultsPage/>}/>
        <Route path='/programas-data' element={<Directory/>}/>
      </Routes>
  </BrowserRouter>,
)

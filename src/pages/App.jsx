/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import '../css/App.css'
// eslint-disable-next-line no-unused-vars
import { Route, Routes, Link, useParams, Outlet} from 'react-router-dom'
import { dataUser } from '../assets/dataUser'
import React from 'react'
import { useRef } from 'react'
// eslint-disable-next-line no-unused-vars



const Home = () => {
  const coursesRef = useRef(null);
  const serviciosRef = useRef(null);
  const facilitiesRef = useRef(null);
  const testimoniosRef = useRef(null);

  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Header
        coursesRef={coursesRef}
        serviciosRef={serviciosRef}
        facilitiesRef={facilitiesRef}
        testimoniosRef={testimoniosRef}
        scrollToRef={scrollToRef}
      />
      <Courses ref={coursesRef} />
      <Servicios ref={serviciosRef} />
      <Facilities ref={facilitiesRef} />
      <Testimonios ref={testimoniosRef} />
    </>
  );
};

const Header = ({
  coursesRef,
  serviciosRef,
  facilitiesRef,
  testimoniosRef,
  scrollToRef,
}) => {
  return (
    <div className='header'>
      <nav>
      <Link to='/'><img src="src/assets/logoVocaTest.png" alt="" /></Link>
        <div className="nav-links" id="navLinks">
        <ul>
          <li>
            <a onClick={() => scrollToRef(coursesRef)}>INICIO</a>
          </li>
          <li>
            <a onClick={() => scrollToRef(serviciosRef)}>SERVICIOS</a>
          </li>
          <li>
            <a onClick={() => scrollToRef(facilitiesRef)}>BENEFICIOS</a>
          </li>
          <li>
            <a onClick={() => scrollToRef(testimoniosRef)}>NOSOTROS</a>
          </li>
        </ul>
        </div>
      </nav>
      <div className="text-box hidden">
        <h1>¿Quieres cambiar tu futuro?</h1>
          <h3>
          &quot;Disfruta la vida conociendo tu vocación&quot;<br />
           Página de Orientación Vocacional.
        </h3>
      </div>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave4"></div>
    </div>
  );
};

const Courses = React.forwardRef((props, ref) => {
  return (
    <section className="course" ref={ref}>
      <h1>¿Qué es orientación vocacional?</h1>
      <div className="row">
        <div className="course-col hidden">
          <h3></h3>
          <p>
          La orientación vocacional es un proceso de autodescubrimiento y exploración que guía a las personas hacia la elección de una carrera que se alinee con sus pasiones, habilidades y valores, permitiéndoles encontrar satisfacción y éxito en su vida profesional.
          </p>
        </div>

        <div className="course-col hidden">
          <h3></h3>
          <p>
          Es un camino de acompañamiento personalizado que ayuda a los individuos a comprender sus fortalezas, debilidades e intereses, brindándoles las herramientas necesarias para tomar decisiones informadas sobre su futuro laboral, fomentando así el desarrollo de una carrera significativa y gratificante.
          </p>
        </div>

        <div className="course-col hidden">
          <h3></h3>
          <p>
          Es un proceso enriquecedor que se enfoca en el autoconocimiento y la exploración de opciones profesionales, permitiendo a las personas identificar y aprovechar su potencial único, para tomar decisiones conscientes y comprometerse con una trayectoria laboral que les brinde realización personal y contribución a la sociedad.
          </p>
        </div>
      </div>
    </section>
  );
});
Courses.displayName = 'Courses'; 

const Servicios= React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="campus">
      <h1>Servicios</h1>
      Haz uso de los siguientes servicios

      <div className="row">
        <div className="campus-col">
          <img src="src/assets/london.png"/>
          <div className="layer">
            <Link to='/test'>
              <h3>Test</h3>
            </Link>
          </div>
        </div>

        <div className="campus-col">
          <img src="src/assets/newyork.png" alt="" />
          <div className="layer">
            <Link to='/programas-data' ><h3>Directorio</h3></Link>
          </div>
        </div>

        <div className="campus-col">
          <img src="src/assets/washington.png" alt="" />
          <div className="layer">
            <Link to='/respuestas-data'><h3>Datos</h3></Link>
          </div>
        </div>
      </div>
    </div>
  )
})
Servicios.displayName = 'Servicios'; 

const Facilities=React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="facilities">
      <h1>Beneficios</h1>
      Beneficios de conocer tu vocación
      <div className="row">
        <div className="facilities-col">
          <img src="src/assets/library.png" alt="" />
          <div className="layer-fac">
            <h3>Satisfacción personal.</h3>
            <p>
              Te involucrarás en actividades que
               realmente te gustan y te apasionan, lo que te
               brindará una mayor satisfacción en tu vida diaria.
            </p>
          </div>
        </div>

        <div className="facilities-col">
          <img src="src/assets/basketball.png" alt="" />
          <div className="layer-fac">
            <h3>Motivación y compromiso.</h3>
            <p>
              Al trabajar en algo que te apasiona, tendrás una mayor motivación interna
              y estarás más comprometido con tu trabajo, lo
              que puede llevar a un mejor desempeño y resultados.
            </p>
          </div>
        </div>

        <div className="facilities-col">
          <img src="src/assets/cafeteria.png" alt="" />
          <div className="layer-fac">
            <h3>Sentido de propósito.</h3>
            <p>
            Te brinda dirección en la vida. Saber qué es lo que realmente
              quieres hacer te ayuda a establecer metas claras y tomar decisiones alineadas
               con tus valores y pasiones.</p>
          </div>
        </div>
      </div>
    </div>
  )
})
Facilities.displayName = 'Facilities'; 

const Testimonios=React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="testimonios">
      <h1>Desarrolladores</h1>
      
      <div className="row">
        {
          dataUser.map((item)=>{
            return(
              <div className="testimonios-col" key={item.id}>
                {/* Para cambiar los datos de cada una pueden ir a /src/assets/dataUser.js*/}
                <img src={item.imgUrl} alt="" />
                <h3>{item.nombre}</h3>
                <p>{item.data}</p>
              </div>
            )
          })
        }
      
      </div>
    </div>
  )
})
Testimonios.displayName = 'Testimonios'; 

function App() {
  return (
    <>
      <Home/>
    </>
  )
}
export default App

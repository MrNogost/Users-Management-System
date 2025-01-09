import React, { useState } from 'react';
import SaveWorker from './SaveWorker';
import ShowWorkers from './ShowWorkers';
import ModifyWorker from './ModifyWorker';
import DeleteWorker from './DeleteWorker';
import './App.css';

function HomePage() {
  const [page, setPage] = useState('home');

  const renderPage = () => {
    switch (page) {
      case 'save':
        return <SaveWorker />;
      case 'show':
        return <ShowWorkers />;
      case 'modify':
        return <ModifyWorker />;
      case 'delete':
        return <DeleteWorker />;
      default:
        return (
          <div>
            <div className="logo-container">
             <a href="/">
            <img src="/logo.PNG" alt="Logo" className="logo" />
            </a>
            </div>
            <h1>Sistema de gestion de trabajadores</h1>
            <button onClick={() => setPage('save')}>Añadir trabajador</button>
            <button onClick={() => setPage('show')}>Mostrar todos los trabajadores</button>
            {/*<button onClick={() => setPage('modify')}>Modificar trabajador</button>*/}
            <button onClick={() => setPage('delete')}>Eliminar Trabajador</button>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      {renderPage()}
    </div>
  );
}

export default HomePage;
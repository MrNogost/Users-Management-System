import React, { useEffect, useState } from 'react';
import './App.css';

function ShowWorkers() {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/get-workers')
      .then(response => response.json())
      .then(data => setWorkers(data))
      .catch(error => console.error('Error fetching workers:', error));
  }, []);

  return (
    <div>
        <div className="logo-container">
        <a href="/">
          <img src="/logo.PNG" alt="Logo" className="logo" />
        </a>
        </div>
      
      <h1>Listado de trabajadores</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido paterno</th>
            <th>Apellido materno</th>
            <th>Telefono</th>
            <th>Fecha de ingreso</th>
            <th>Salario</th>
            <th>Descripción de actividades</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker, index) => (
            <tr key={index}>
              <td>{worker.name}</td>
              <td>{worker.fatherLastName}</td>
              <td>{worker.motherLastName}</td>
              <td>{worker.telephone}</td>
              <td>{new Date(worker.entryDate).toLocaleDateString()}</td>
              <td>{worker.salary}</td>
              <td>{worker.jobTasks}</td>
              <td>{worker.email}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowWorkers;
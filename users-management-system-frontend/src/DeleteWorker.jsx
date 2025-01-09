import React, { useState } from 'react';
import './App.css';

function DeleteWorker() {
  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(false); // To track general error state
  const [responseMessage, setResponseMessage] = useState(''); // For success or error message

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setFormErrors({ email: 'Se requiere ingresar el correo electrónico' });
      return;
    }

    fetch('http://localhost:8080/delete-worker', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          setError(true);
          throw new Error('Error, no se pudo eliminar al trabajador');
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        // Assuming the response contains a message like 'delete ok' or error message
        if (data.success) {
          setResponseMessage('Trabajador eliminado correctamente');
        } else {
          setResponseMessage('Estado: ' + data.message);
          setError(true);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setResponseMessage(error.message);
        setError(true);
      });
  };

  return (
    <div>
        <div className="logo-container">
        <a href="/">
          <img src="/logo.PNG" alt="Logo" className="logo" />
        </a>
        </div>
      <h1>Eliminar Trabajador</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleInputChange}
          />
          {formErrors.email && <span className="error">{formErrors.email}</span>}
        </div>
        <button type="submit">Delete</button>
      </form>

      {/* Display success or error message */}
      {responseMessage && (
        <div className={error ? 'error-message' : 'success-message'}>
          {responseMessage}
        </div>
      )}
    </div>
  );
}

export default DeleteWorker;
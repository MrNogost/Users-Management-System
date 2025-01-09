import React, { useState } from 'react';
import './App.css'; // Import the CSS file for styling

// Main App Component
function App() {
  const [formData, setFormData] = useState({
    name: '',
    fatherLastName: '',
    motherLastName: '',
    telephone: '',
    entryDate: '',
    salary: '',
    jobTasks: '',
    profilePicture: null,
  });

  const [error, setError] = useState(false);  // To track error
  const [formErrors, setFormErrors] = useState({}); // To track individual field errors

  // Handle input changes, but sanitize input based on type
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Sanitize input based on the field type
    let sanitizedValue = value;

    if (name === 'name' || name === 'fatherLastName' || name === 'motherLastName') {
      // Allow only alphabetic characters and spaces
      sanitizedValue = value.replace(/[^a-zA-Z\s]/g, '');
    } else if (name === 'telephone') {
      // Allow only numeric characters for phone number
      sanitizedValue = value.replace(/[^0-9]/g, '');
    } else if (name === 'salary') {
      // Allow only numeric input for salary
      sanitizedValue = value.replace(/[^0-9.]/g, '');  // Allow digits and decimal point
    }

    setFormData({ ...formData, [name]: sanitizedValue });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const validateForm = () => {
    let errors = {};

    // Validate Name fields (only alphabetic characters allowed)
    if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      errors.name = 'Name should only contain alphabetic characters';
    }
    if (!/^[a-zA-Z\s]+$/.test(formData.fatherLastName)) {
      errors.fatherLastName = 'Father Last Name should only contain alphabetic characters';
    }
    if (!/^[a-zA-Z\s]+$/.test(formData.motherLastName)) {
      errors.motherLastName = 'Mother Last Name should only contain alphabetic characters';
    }

    // Validate Telephone field (numeric and length of 10 digits)
    if (!/^\d{10}$/.test(formData.telephone)) {
      errors.telephone = 'Telephone should be a 10-digit number';
    }

    // Validate Salary (positive number)
    if (formData.salary <= 0 || isNaN(formData.salary)) {
      errors.salary = 'Salary should be a positive number';
    }

    // Validate Profile Picture (must be an image file)
    if (formData.profilePicture && !formData.profilePicture.type.startsWith('image/')) {
      errors.profilePicture = 'Profile Picture should be an image file';
    }

    // Validate Job Description (not empty)
    if (!formData.jobTasks.trim()) {
      errors.jobTasks = 'Job tasks description is required';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    // If no errors, proceed with form submission
    if (Object.keys(errors).length === 0) {
      const formDataToSend = new FormData();

      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      fetch('http://localhost:8080/modify-data', {
        method: 'POST',
        body: formDataToSend,
      })
        .then((response) => {
          if (!response.ok) {
            setError(true);  // Handle error case
            throw new Error('Something went wrong!');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Success:', data);
          alert('Worker added successfully!');
        })
        .catch((error) => {
          console.error('Error:', error);
          setError(true);  // Show error on failed request
        });
    }
  };

  return (
    <div className="app-container">
      {/* Logo at the top (remains visible at all times) */}
      <div className="logo-container">
        <a href="/">
          <img src="/logo.png" alt="Logo" className="logo" />
        </a>
        </div>

      {/* Form */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              maxLength={50}  // Restrict input length
            />
            {formErrors.name && <span className="error">{formErrors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="fatherLastName">Apellido Paterno</label>
            <input
              type="text"
              name="fatherLastName"
              id="fatherLastName"
              value={formData.fatherLastName}
              onChange={handleInputChange}
              maxLength={50}  // Restrict input length
            />
            {formErrors.fatherLastName && <span className="error">{formErrors.fatherLastName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="motherLastName">Apellido Materno</label>
            <input
              type="text"
              name="motherLastName"
              id="motherLastName"
              value={formData.motherLastName}
              onChange={handleInputChange}
              maxLength={50}  // Restrict input length
            />
            {formErrors.motherLastName && <span className="error">{formErrors.motherLastName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="telephone">Telefono</label>
            <input
              type="tel"
              name="telephone"
              id="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
              maxLength={15}  // Example: limit to 15 characters for phone number
            />
            {formErrors.telephone && <span className="error">{formErrors.telephone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="entryDate">Fecha de ingreso</label>
            <input
              type="date"
              name="entryDate"
              id="entryDate"
              value={formData.entryDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salario</label>
            <input
              type="number"
              name="salary"
              id="salary"
              value={formData.salary}
              onChange={handleInputChange}
            />
            {formErrors.salary && <span className="error">{formErrors.salary}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="jobTasks">Descripción de las funciones del empleado</label>
            <textarea
              name="jobTasks"
              id="jobTasks"
              value={formData.jobTasks}
              onChange={handleInputChange}
              maxLength={500}  // Restrict input length
            ></textarea>
            {formErrors.jobTasks && <span className="error">{formErrors.jobTasks}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="profilePicture">Seleccionar foto de perfil</label>
            <input
              type="file"
              accept="image/*"
              id="profilePicture"
              onChange={handleFileChange}
            />
            {formErrors.profilePicture && <span className="error">{formErrors.profilePicture}</span>}
          </div>

          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
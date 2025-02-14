document.getElementById('sign-in-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('error-message');

  // Verifica que los campos no estén vacíos
  if (!email || !password) {
      errorMessage.textContent = "Por favor, completa todos los campos.";
      errorMessage.style.display = "block";
      return;
  }

  console.log('Datos enviados:', { email, password }); // Debug en consola

  fetch('http://localhost:3000/api/login', {  // Usa la URL completa
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      if (data.success) {
          alert('Inicio de sesión exitoso.');
          window.location.href = "dashboard.html"; // Redirigir después del login
      } else {
          errorMessage.textContent = data.message || "Usuario o contraseña incorrectos.";
          errorMessage.style.display = "block";
      }
  })
  .catch(error => {
      console.error('Error:', error);
      errorMessage.textContent = "Hubo un error al intentar iniciar sesión.";
      errorMessage.style.display = "block";
  });
});

//lol
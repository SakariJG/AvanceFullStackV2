// Lógica para el formulario de registro
document.getElementById('register-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const errorMessage = document.getElementById('error-message');

  // Validar si las contraseñas coinciden
  if (password !== confirmPassword) {
    errorMessage.textContent = "Las contraseñas no coinciden.";
    errorMessage.style.display = "block";
    return;
  }

  // Validar si los campos están vacíos
  if (!username || !password) {
    errorMessage.textContent = "Todos los campos son requeridos.";
    errorMessage.style.display = "block";
    return;
  }

  // Hacer la solicitud al backend para registrar al usuario
  fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, confirmPassword }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Usuario registrado exitosamente.');
      window.location.href = "sign-in.html"; // Redirigir a inicio de sesión
    } else {
      errorMessage.textContent = data.message;
      errorMessage.style.display = "block";
    }
  })
  .catch(error => {
    console.error('Error:', error);
    errorMessage.textContent = "Hubo un error al registrar el usuario.";
    errorMessage.style.display = "block";
  });
});

// Lógica para el formulario de inicio de sesión
document.getElementById('sign-in-form').addEventListener('submit', (e) => {
e.preventDefault();

const username = document.getElementById('username').value;
const password = document.getElementById('password').value;
const errorMessage = document.getElementById('error-message');

// Validar si los campos están vacíos
if (!username || !password) {
  errorMessage.textContent = "Todos los campos son requeridos.";
  errorMessage.style.display = "block";
  return;
}

// Hacer la solicitud al backend para autenticar al usuario
fetch('/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username, password }),
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    alert('Inicio de sesión exitoso.');
    window.location.href = "dashboard.html"; // Redirigir al dashboard
  } else {
    errorMessage.textContent = data.message;
    errorMessage.style.display = "block";
  }
})
.catch(error => {
  console.error('Error:', error);
  errorMessage.textContent = "Hubo un error al intentar iniciar sesión.";
  errorMessage.style.display = "block";
});
});

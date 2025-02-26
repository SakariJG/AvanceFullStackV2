// Alternar entre formularios
const InicioLink = document.getElementById('Inicio');
const PerfilLink = document.getElementById('Perfil');
const MascotasLink = document.getElementById('Mascotas');
const AgendaLink = document.getElementById('Agenda');

// Seleccionar todas las secciones principales
const secciones = document.querySelectorAll('.profile-content, .PerfilInfo');

const PerfilInfo = document.querySelectorAll('.PerfilInfo');
const MascotasInfo = document.getElementById('detalles-mascotas');

MascotasInfo.style.display = 'none';

// Evento click en Mascotas
MascotasLink.addEventListener('click', (event) => {
    event.preventDefault(); // Evitar que el enlace recargue la página

    // Ocultar todas las secciones del perfil
    PerfilInfo.forEach(section => section.style.display = 'none');

    // Mostrar la sección de mascotas y ocultar la que este
    MascotasInfo.style.display = 'block';
});



{/* <script>
// JavaScript para alternar entre formularios
const signupLink = document.getElementById('signup-link');
const loginLink = document.getElementById('login-link');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

signupLink.addEventListener('click', (event) => {
    event.preventDefault(); // Evitar que el enlace recargue la página
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
});

loginLink.addEventListener('click', (event) => {
    event.preventDefault(); // Evitar que el enlace recargue la página
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// Inicializar el formulario de inicio de sesión
signupForm.style.display = 'none'; // Ocultar el formulario de registro por defecto

// Manejo de parámetros de URL
const urlParams = new URLSearchParams(window.location.search);
const action = urlParams.get('action');

if (action === 'signup-form') {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
} else {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
}
</script> */}
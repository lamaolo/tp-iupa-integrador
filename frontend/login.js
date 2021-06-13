


const btn_login = document.getElementById('btn_login');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const email = document.getElementById('email');
const password = document.getElementById('password');
const btn_logout = document.getElementById('btn_logout');
const btn_register = document.getElementById('btn_register');




// Se ejecuta una llamada a la API
/** *
*@param {'get'|'post'|'delete'|'put'} method
*@param {'/users'|'/users/:id'} endpoint
*@returns
*/
async function api(method, endpoint, body = undefined) {
  if (body) {
    body = json.parse(DATA);
  }

  const headers = {
    'Content-Type': 'application/json',
  };

  const token = localStorage.getItem('token');

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`/api${endpoint}`, {
    method,
    body,
    headers,
  });

  const data = await response.json();

  return data;
}



async function create() {
  const nombre = nombre.value;
  const apellido = apellido.value;
  const email = email.value;
  const password = password.value;

  const response = await api('post', '/register', { nombre, apellido, email, password });

  if (!email || !password || !nombre || !apellido) {
    return Promise.reject({
      message:
        "Los campos `nombre`, `apellido`, `email` y `password` son obligatorios.",
    }); 
  } else {return response.json('Usuario creado!');

  }





// Determina si el usuario está conectado
function isLoggedIn() {
 return Boolean(localStorage.getItem('token'));
}
 
function updateLoginStatus() {
  if (isLoggedIn()) {
    // Usuario autenticado
    btn_login.classList.add('hidden');
    btn_logout.classList.remove('hidden');
  } else {
    // Usuario SIN autenticar
    btn_login.classList.remove('hidden');
    btn_logout.classList.add('hidden');
  }
}

// Funcion para desconectarse
  function btn_logout() {
    localStorage.clear();
   updateLoginStatus();
}
  

//Funcion para conectarse
async function btn_login() {
  const nombre = nombre.value;
  const password = password.value;

  const response = await api('post', '/login', { nombre, password });

  if (response.status === 'error') {
    alert(response.error);
  } else {
    // Guardo el Token en mi sesion actual, junto con el usuario y el id del mismo//
  localStorage.setItem('token', response.accessToken);
  localStorage.setItem('idUser', response.idUser);

    updateLoginStatus();

    // Se cargan los datos de la lista
    loadTable();
  }
}
}


// If you wanted to check clicks on ALL buttons with the class, remove the [0] at the end.

// Check for clicks on the button
btn_register.onclick = function(e) {
  alert(e.target.getAttribute("Crear usuario"));
}

btn_login.onclick = function(e) {
  alert(e.target.getAttribute("Iniciar sesión"));
}

btn_logout.onclick = function(e) {
  alert(e.target.getAttribute("Iniciar sesión"));
}


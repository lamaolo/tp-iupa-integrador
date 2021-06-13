


const btn_login = document.getElementById('btn_login');
const nombre = document.getElementById('nombre');
const inputNombre = document.getElementById('inputNombre');
const inputNombreHelp = document.getElementById('inputNombreHelp');
const inputNombreFormGroup = inputNombreHelp.parentElement;
const apellido = document.getElementById('apellido');
const inputApellido = document.getElementById('inputApellido');
const inputApellidoHelp = document.getElementById('inputApellidoHelp');
const inputApellidoFormGroup = inputApellidoHelp.parentElement;
const email = document.getElementById('email');
const inputEmail = document.getElementById('inputEmail');
const inputEmailHelp = document.getElementById('inputEmailHelp');
const inputEmailGroup = inputEmailHelp.parentElement;
const password = document.getElementById('password');
const inputPassword = document.getElementById('inputPassword');
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
    const nombre = inputNombre.value;
    const apellido = inputApellido.value;
    const email = inputEmail.value;
    const password = inputPassword.value;
  
    resetFormErrors();
  
    const response = await api('post', '/users', {
      name,
      age,
    });
  
    if (response.errors) {
      updateFormErrors(response.errors);
    } else {
      createUserForm.reset();s
    }
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
function logout() {
    localStorage.clear();
    hideContentRow();
   updateLoginStatus();
}
  

//Funcion para conectarse
async function login() {
  const email = email.value;
  const password = password.value;

  const response = await api('post', '/login', { email, password });

  if (response.status === 'error') {
    alert(response.error);
  } else {
    // Guardo el Token en mi sesion actual, junto con el usuario y el id del mismo//
  localStorage.setItem('token', response.accessToken);
  localStorage.setItem('idUser', response.idUser);

    updateLoginStatus();

    // Se cargan los datos de la lista
    loadTable();
    showLista();
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


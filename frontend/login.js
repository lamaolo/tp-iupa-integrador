const form = document.getElementById('form');
const login = document.getElementById('btn_login');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const email = document.getElementById('email');
const password = document.getElementById('password');
const logout = document.getElementById('btn_logout');
const createUser = document.getElementById('btn_register');

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







// Determina si el usuario está conectado
function isLoggedIn() {
 return Boolean(localStorage.getItem('token'));
}
 
function updateLoginStatus() {
  if (isLoggedIn()) {
    // Usuario autenticado
    formLogin.classList.add('hidden');
    lOut.classList.remove('hidden');
  } else {
    // Usuario SIN autenticar
    formLogin.classList.remove('hidden');
    lOut.classList.add('hidden');
  }
}

// Funcion para desconectarse
  function logout() {
    localStorage.clear();
   updateLoginStatus();
}
  

//Funcion para conectarse
async function formLogin() {
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

updateLoginStatus();


async function createUser(evento) {
  evento.preventDefault();
  try {
    const datos = {
      nombre: nombre.value,
      apellido: apellido.value,
      email: email.value,
      password: password.value,
    };
    const accion = btn_register.innerHTML;
    let urlEnvio = url;
    let method = "POST";
    if (accion === "Edit") {
      urlEnvio += `/${indice.value}`;
      method = "PUT";
    }
    const respuesta = await fetch(urlEnvio, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
      mode: "cors",
    });
    if (respuesta.ok) {
      createUser();
      updateLoginStatus();
    }
  } catch (error) {
    console.log({ error });
    $(".alert").show();
  }
}




form.onsubmit = createUser;
create.onclick = createUser;
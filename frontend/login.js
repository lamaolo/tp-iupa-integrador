const formLogin = document.getElementById('login');
const regName = document.getElementById('name');
const regSname = document.getElementById('surname');
const loginUser = document.getElementById('username');
const writePass = document.getElementById('password');
const lOut = document.getElementById('logOut');

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
  async function login() {
    const username = loginUser.value;
    const password = writePass.value;
  
    const response = await api('post', '/login', { username, password });
  
    if (response.status === 'error') {
      alert(response.error);
    } else {
      // Guardo el Token en mi sesion actual
    localStorage.setItem('token', response.accessToken);
  
      updateLoginStatus();
  
      // Se cargan los datos de la lista
      loadTable();
    }
  }
  
  updateLoginStatus();


async function createUser() {
  const create = ({ nombre, apellido, email, password }) => {
    if (!email || !password || !nombre || !apellido) {
      return Promise.reject({
        message:
          "Los campos `nombre`, `apellido`, `email` y `password` son obligatorios.",
      });
    }
  
    return new Promise((resolve, reject) => {
      db.registerUser({ nombre, apellido, email, password })
        .then(([usuarioCreado]) => resolve(usuarioCreado))
        .catch((error) => reject(error));
    });
  };
}



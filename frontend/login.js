const formLogin = document.getElementById('login');
const loginUser = document.getElementById('username');
const writePass = document.getElementById('password');
const lOut = document.getElementsById('logOut');

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
    const password = loginPassword.value;
  
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
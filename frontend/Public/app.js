
// Referencia a la lista de tareas
const list = document.getElementById('listaTareas');

// Refiere al template


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

 //AGREGAR ROW



 function showLista(){
  // get a reference to your element, or it's container
  const listaTareas = document.getElementById('listaTareas');
  listaTareas.style.display = '';
  hideContentRow();
}

function hideContentRow(){
  const contentRow = document.getElementById('contentRow');
  contentRow.style.display = 'none';
}



 

 function addRow(nombre, tarea_Id, tarea, descripcion) {
 const row =templateRow.cloneNode(true);

  // Modifico el valor del nodo de texto por el ingesado por el usuario
row.querySelector('.txtName').innerText = nombre;
row.querySelector('.txtTarea').innerText = tarea;
row.querySelector('.txtTaskId').innerText = tarea_Id;
row.querySelector('.txtDescription').innerText = descripcion;


row.querySelector('.btnEdit').addEventListener('click', () => updateTask());

row.querySelector('.row').dataset.id = id;

  // Inserto en el contenido de la tabla
list.appendChild(row);
}


// Cargar datos de la tabla
 async function loadTable() {
  if (localStorage.getItem('token')) {
    list.innerHTML = '';
    //const data = await api('get', '/users');
    const data = await api('get', '/users');

    data.forEach(({ nombre, tarea, tarea_Id, descripcion }) => addRow(nombre, tarea, tarea_Id, descripcion));
  }
 }

// Inicio de la APP.
async function initApp() {
  await loadTable();
}



///Crear usuario - api/users
/* 
 async function createUser() {
  const nombre = inputName.value;

  resetFormErrors();

  const response = await api('post', '/users', {
    nombre,
  });
*/
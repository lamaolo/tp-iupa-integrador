# Backend Proyecto Integrador.

## Scripts:

- `npm run dev`: Inicia proyecto en modo de desarrollo.
- `npm run start`: Inicia proyecto en modo de produccion.

## Endpoints:

#### Usuarios:

- `POST /api/usuarios/register` - Registra un nuevo usuario.
  - `{ "nombre": "", "apellido": "", "email": "", "password": "" }`

- `POST /api/usuarios/login` - Hace login de un usuario existente.
  - `{ "email": "", "password": "" }`

#### Tareas:

- `GET /api/tareas` - Lista todas las tareas.

- `POST /api/tareas` - Crea una nueva tarea asociada a un usuario.
  - `{ "titulo": "", "descripcion": "", "id_usuario": "" }`

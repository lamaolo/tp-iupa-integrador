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

Estos endpoints detectan el ID del usuario que esta realizando la petición a través del JWT enviado y devuelve o inserta las tareas correspondientes a ese usuario.

- `GET /api/tareas` - Lista todas las tareas del usuario que envíe la petición.

- `POST /api/tareas` - Crea una nueva tarea asociada al usuario que envíe la petición.

  - `{ "titulo": "", "descripcion": "" }`

- `PUT /api/tareas/:id` - Edita la tarea con el ID pasado por query, correspondiente al usuario que la creó.

  - `{ "titulo": "", "descripcion": "" }` - Ambos campos son opcionales, pero debe enviarse al menos uno.

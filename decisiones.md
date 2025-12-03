🧩 1. Investigación UI/UX

Referencias:

Enfoque UX/UI preferido:


🧩 2. Diseño del Flujo de Datos

- cómo funcionaría el sistema de favoritos a nivel teórico?

Hay un botón en la UI que permite al usuario añadir a favs. Se procesa desde el front, se manda
un update a la base de datos.

- Estructura de datos: ¿Qué información se almacena? ¿En qué formato?

Por detrás, estamos cambiando el value de la key "isFavourite", de nuestro objeto Business.
isFavourite es boolean, asi que cambiamos a true.

- Persistencia: ¿Cómo se guardan los favoritos en DB?

Tenemos un endpoint de tipo put o patch que nos permite cambiar el objeto entero o bien
campos especificos de ese objeto. Por tanto: el front manda al back la info del objeto que estamos
modificando, gracias al metodo, y el back manda a la bbdd el objeto actualizado.
Como se guardan dependera de si la BBDD es relacional o no-relacional (muchos a muchos, pero de que manera)

- API Design: ¿Qué endpoints necesitas? ¿Qué métodos HTTP?

De manera completa, necesitariamos hacer un CRUD (Create, Read, Update, Delete). En este caso haremos un put y un delete. Cuando se hace click en el boton que procesa la funcion de añadir a favoritos, estamos creando un favorito, por lo tanto estamos usando el metodo PUT. Dando por hecho que el botón es tipo toggle, cuando volvemos a hacer click (como en IG, a un corazón, una estrellita...), estaremos invocando al metodo DELETE, puesto que lo queremos retirar de favs.

- Lectura/Escritura: ¿Cómo se comunican frontend y backend?

Se comunican mediante peticiones HTTP (con API) tipo GET (get/$id, get --> all), PUT, PATCH, DELETE...

- Estados: ¿Qué estados debe manejar la aplicación? (vacío, cargando, con favoritos, errores, etc.)

Para manejar las peticiones deberiamos tener minimo tres estados: completado/exito, loading, error.
Despues, podremos tener diferentes estados (states) para manejar datos cambiantes, como por ejemplo, el array de favs en el front.

- Sincronización: ¿Cómo se mantiene sincronizado el estado entre componentes?

Depende del contexto, en algunos casos elevando el state al contenedor o componente padre, y en otros casos, cuando es necesario que toda la aplicacion tenga conocimiento de ese dato, crearemos un context provider.
Wrappearemos nuestro componente <App /> para que todas sus rutas tengan acceso, y asi evitar el prop drilling (cuando un prop pasa por muchos componentes, es momento de usar un contexto).

Se podria tambien utilizar un gestor de estados tipo Redux o Zustand, para mejorar la escalabilidad y la buena arquitectura.

- Define tu propia arquitectura y justifica tus decisiones.

── package-lock.json
│   ├── package.json
│   ├── public
│   │   └── vite.svg
│   ├── README.md
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── BusinessModal.jsx
│   │   │   ├── Map
|   |   |   |   |__ MapContainer.jsx ← ← ←
│   │   │   └── SearchBar.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── vite.config.js
├── decisiones.md
├── node_modules

► Por ejemplo, en components, organizaria por features o por atomic design.
Ex features: Map --> MapContainer.jsx, Map.jsx, MapCard.jsx...

► Haria tambien una carpeta Pages, para tener todas las páginas de las rutas del router (<AppRoutes />)
Ex pages: Pages --> Home.jsx, Profile.jsx...

► Separaria los estados en carpetas aparte:
Hooks --> useFavourites.js, useFetchBusinesses.jsx...
Context --> AuthContext.jsx, FilterContext.jsx...

► Tendria los archivos de config y conexion con API aparte, puesto que se pueden utilizar
en muchas partes de la app:
Config --> api-connection.js
Service --> business.service.js (para el fetcheo de los business por ejemplo)

► Si lo hicieramos con Typescript, tendria una carpeta para los types y los exportaria a toda la app:
Types: BusinessType.ts, UserType.ts...

► Carpeta utils: carpeta perfecta para meter todas las funciones que se pueden reutilizar. Calculos, filtrados...:
Utils --> CalculateByDistance.js, FilterByProximity.js, FinsBusiness.js...

🧩 3. Implementación del MVP
Implementa la funcionalidad básica de favoritos usando backend in-memory:

Requisitos obligatorios:
✅ Backend: Endpoints para añadir/eliminar favoritos (almacenamiento in-memory)
✅ Frontend: Llamadas a la API para gestionar favoritos
✅ UI: Indicador visual del estado (favorito o no)

No es necesario:
Autenticación de usuarios (puedes usar un ID de sesión simple)
Persistencia en base de datos real
Ver una lista completa de favoritos
Filtrar por favoritos
Nota: Los favoritos se almacenarán en memoria del servidor (se perderán al reiniciar), pero esto es suficiente para demostrar una arquitectura full-stack.

Queremos ver cómo implementas tu diseño teórico en código funcional.
# 🧩 1. Investigación UI/UX

* **Referencias:** No he encontrado demasiadas referencias al respecto. Pero he mirado mis apps del móvil
y he valorado el tiempo que tenia vs las posibilidades y he creado esta UI.

De las que he visto, si tuviera que escoger una, sería esta. Es muy clean, se entiende perfectamente. La memoria colectiva reconoce el corazoncito
para dar like --> los likes se guardan --> favorito. También podría usarse una estrellita, o un "Guardados".

<img width="535" height="428" alt="Screenshot 2025-12-03 at 15 44 35" src="https://github.com/user-attachments/assets/42ca5555-6e8d-4ddd-bbd7-7fd17d81387d" />

# 🧩 2. Diseño del Flujo de Datos

### ¿Cómo funcionaría el sistema de favoritos a nivel teórico?

Hay un botón en la UI que permite al usuario añadir a favoritos. Se procesa desde el frontend y se manda un *update* a la base de datos.

### Estructura de datos: ¿Qué información se almacena? ¿En qué formato?

En el caso de una BBDD relacional, añadimos una TABLA `Favourites` y la enlazamos con el `userID` y el `BusinessID`.
Si no, podría ser un array en el frontend con cookies o `localStorage`... tipo `User: name, passw, email, favs[id1, id3, id547...]`, pero sería más lento para buscar.

### Persistencia: ¿Cómo se guardan los favoritos en DB?

Tenemos un *endpoint* de tipo PUT o PATCH que nos permite cambiar el objeto entero o bien campos específicos de ese objeto. Por tanto: el frontend manda al backend la información del objeto que estamos modificando, gracias al método, y el backend manda a la BBDD el objeto actualizado.
Cómo se guardan dependerá de si la BBDD es relacional o no relacional (muchos a muchos, pero de qué manera).

### API Design: ¿Qué endpoints necesitas? ¿Qué métodos HTTP?

De manera completa, necesitaríamos hacer un CRUD (Create, Read, Update, Delete). En este caso haremos un PUT y un DELETE.
Cuando se hace clic en el botón que procesa la función de añadir a favoritos, estamos creando un favorito, por lo tanto estamos usando el método PUT.
Dando por hecho que el botón es tipo *toggle*, cuando volvemos a hacer clic (como en IG, a un corazón, una estrellita...), estaremos invocando al método DELETE, puesto que lo queremos retirar de favoritos.

### Lectura/Escritura: ¿Cómo se comunican frontend y backend?

Se comunican mediante peticiones HTTP (con API) tipo GET (`get/$id`, `get` --> `all`), PUT, PATCH, DELETE...

### Estados: ¿Qué estados debe manejar la aplicación? (vacío, cargando, con favoritos, errores, etc.)

Para manejar las peticiones deberíamos tener mínimo tres estados: completado/éxito, *loading*, error.
Después, podremos tener diferentes estados (*states*) para manejar datos cambiantes, como por ejemplo, el array de favoritos en el frontend.

### Sincronización: ¿Cómo se mantiene sincronizado el estado entre componentes?

Depende del contexto; en algunos casos elevando el *state* al contenedor o componente padre, y en otros casos, cuando es necesario que toda la aplicación tenga conocimiento de ese dato, crearemos un *context provider*.
Envolveremos (*wrappear*) nuestro componente `<App />` para que todas sus rutas tengan acceso, y así evitar el *prop drilling* (cuando una *prop* pasa por muchos componentes, es momento de usar un contexto).

Se podría también utilizar un gestor de estados tipo Redux o Zustand, para mejorar la escalabilidad y la buena arquitectura.

### Define tu propia arquitectura y justifica tus decisiones.

```text
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
│   │   │   │   └── MapContainer.jsx ← ← ←
│   │   │   └── SearchBar.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── vite.config.js
├── decisiones.md
├── node_modules

* **Components:** Organizaría por *features* (funcionalidades) o por *Atomic Design*.
    * Ejemplo features: `Map` → `MapContainer.jsx`, `Map.jsx`, `MapCard.jsx`...

* **Pages:** Haría también una carpeta `Pages` para tener todas las páginas de las rutas del router (`<AppRoutes />`).
    * Ejemplo: `Pages` → `Home.jsx`, `Profile.jsx`...

* **Hooks & Context:** Separaría los estados en carpetas aparte.
    * `Hooks` → `useFavourites.js`, `useFetchBusinesses.jsx`...
    * `Context` → `AuthContext.jsx`, `FilterContext.jsx`...

* **Config & Service:** Tendría los archivos de configuración y conexión con la API aparte, puesto que se pueden utilizar en muchas partes de la aplicación.
    * `Config` → `api-connection.js`
    * `Service` → `business.service.js` (para la obtención de los negocios, por ejemplo).

* **Types (Opcional):** Si lo hiciéramos con TypeScript, tendría una carpeta para los tipos y los exportaría a toda la aplicación.
    * `Types` → `BusinessType.ts`, `UserType.ts`...
    
* **Utils:** Carpeta ideal para incluir todas las funciones reutilizables (cálculos, filtrados...).
    * `Utils` → `CalculateByDistance.js`, `FilterByProximity.js`, `FindBusiness.js`...

# 🧩 3. Implementación del MVP

Implementación de la funcionalidad básica de favoritos usando backend *in-memory*.

**Requisitos obligatorios:**
* ✅ **Backend:** Endpoints para añadir/eliminar favoritos (almacenamiento *in-memory*).
* ✅ **Frontend:** Llamadas a la API para gestionar favoritos.
* ✅ **UI:** Indicador visual del estado (favorito o no).

**No es necesario:**
* Autenticación de usuarios (puedes usar un ID de sesión simple).
* Persistencia en base de datos real.
* Ver una lista completa de favoritos.
* Filtrar por favoritos.

*Nota: Los favoritos se almacenarán en la memoria del servidor (se perderán al reiniciar), pero esto es suficiente para demostrar una arquitectura full-stack.*

# 🧩 4. Mejoras (si tuviera más tiempo)

* Renderizaría los favoritos en algún lugar y usaría el método `GET`.
* Utilizaría una librería de estilos.
* Si tuviera que usar CSS puro obligatoriamente, en vez de usar estilos en línea (como he hecho), los ordenaría en ficheros según el componente, enlazados por nombres y IDs.
* Crearía un router con `react-router-dom`.
* Refactorizaría todo el componente `<App />` para que no tuviera nada de lógica, conteniendo solo las `<AppRoutes />`.

# 🧩 4. UI shots:
<img width="375" height="666" alt="Screenshot 2025-12-03 at 15 46 10" src="https://github.com/user-attachments/assets/8179e73e-4ddd-4ebf-850c-48892112e000" />
<img width="377" height="666" alt="Screenshot 2025-12-03 at 15 46 26" src="https://github.com/user-attachments/assets/a94ce79e-6af4-4daa-8a8c-638a0bd1f646" />
<img width="376" height="666" alt="Screenshot 2025-12-03 at 15 46 41" src="https://github.com/user-attachments/assets/050cef2a-22d7-4703-b2f9-dd41c942842f" />


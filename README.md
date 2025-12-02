# Vuélvete Local – Prueba Técnica Full Stack (Añadir Favoritos)

**Duración:** 1 hora  
**Stack:** React + Node.js/Express + Leaflet

---

## 📋 Contexto

Esta es una aplicación web ya funcional para visualizar comercios locales en un mapa.

Tu tarea consiste en **diseñar y comenzar a implementar la funcionalidad de “añadir a favoritos”**.

El objetivo es evaluar tu capacidad para **investigar**, **razonar**, **diseñar** y **priorizar bajo tiempo limitado**.

---

## 🧩 1. Investigación UI/UX

Antes de pensar en la solución técnica, realiza una breve investigación sobre interfaces de usuario relacionadas con sistemas de favoritos.

Debes entregar:

- Las referencias que encontraste (capturas, enlaces, etc.)
- Qué enfoque UI/UX te pareció mejor  
- Por qué elegiste ese enfoque

---

## 🧩 2. Diseño del Flujo de Datos

Explica cómo funcionaría el sistema de favoritos a nivel teórico:

- **Estructura de datos**: ¿Qué información se almacena? ¿En qué formato?
- **Persistencia**: ¿Cómo se guardan los favoritos en base de datos? 
- **Lectura/Escritura**: ¿Cómo se parsean y actualizan los datos?
- **Estados**: ¿Qué estados debe manejar la aplicación? (vacío, con favoritos, errores, etc.)
- **Sincronización**: ¿Cómo se mantiene sincronizado el estado entre componentes?

Define tu propia arquitectura y justifica tus decisiones.

---

## 🧩 3. Implementación del MVP

Implementa la funcionalidad básica de favoritos usando **localStorage**, ya que en este ejemplo no tenemos DB:

### Requisitos obligatorios:
- ✅ **Añadir** un comercio a favoritos
- ✅ **Eliminar** un comercio de favoritos
- ✅ Indicador visual del estado (favorito o no)

### No es necesario:
- Ver una lista completa de favoritos
- Filtrar por favoritos
- Sincronización con backend

Queremos ver cómo implementas tu diseño teórico en código funcional.

---

## 📦 Entregables

### ✔ Código
Incluyendo el MVP funcional de “añadir a favoritos”.

### ✔ Documento `DECISIONES.md`
Debe incluir:

1. **Investigación UI/UX**: Referencias encontradas y justificación de tu elección
2. **Diseño del Flujo de Datos**: Estructura, persistencia, estados y sincronización
3. **Decisiones de Implementación**: Qué implementaste, cómo lo hiciste y por qué
4. **Próximos Pasos**: Qué harías si tuvieras más tiempo  

---

## � Estructura del Proyecto

El proyecto es un monorepo simple que contiene tanto el backend como el frontend.

### Backend (`/`)
- **`server.js`**: Punto de entrada del servidor Express. Maneja la API y sirve los datos de los comercios.

### Frontend (`/client`)
Aplicación React creada con Vite.
- **`src/components/`**:
  - **`MapContainer.jsx`**: Componente principal que renderiza el mapa usando Leaflet.
  - **`BusinessModal.jsx`**: Modal que muestra la información detallada de un comercio.
  - **`SearchBar.jsx`**: Barra de búsqueda para filtrar comercios.
- **`src/App.jsx`**: Componente raíz que orquesta la aplicación.

---

## �🚀 Instalación y Ejecución

### Backend
```bash
npm install
npm start
```
**Servidor:** http://localhost:3001

### Frontend
```bash
cd client
npm install
npm run dev
```
**Aplicación:** http://localhost:5173

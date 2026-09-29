# TP6 — Clon de Instagram con React 🐱

Aplicación web inspirada en Instagram que muestra imágenes de gatos obtenidas desde una API externa.

## 🔗 Diseño de Figma utilizado como referencia

**[Instagram Web UI Recreated](https://www.figma.com/es-es/comunidad/file/1235135369163092252/instagram-web-ui-recreated)**

El diseño implementado sigue fielmente la estética oscura del Figma: sidebar izquierdo con perfil y navegación, barra superior con búsqueda, sección de Stories, feed en grilla de 3 columnas (Trending), y modal de publicación individual.

---

## 🚀 Cómo ejecutar el proyecto

```bash
cd Tp6
npm install
npm run dev
```

Luego abrir [http://localhost:5173](http://localhost:5173) en el navegador.

---

## 📁 Organización del proyecto

```
src/
├── components/
│   ├── Header/          # Barra superior
│   ├── Sidebar/         # Panel lateral con perfil y navegación
│   ├── Stories/         # Sección de historias
│   ├── Feed/            # Grilla de publicaciones (Trending)
│   ├── PostCard/        # Tarjeta individual de publicación
│   ├── PostModal/       # Modal de visualización detallada
│   └── ProfileView/     # Vista de perfil de usuario
├── data/
│   └── userData.ts      # Datos fijos del usuario y datos mock
├── types/
│   └── index.ts         # Interfaces TypeScript (Post, Story, Comment)
├── App.tsx              # Componente raíz, manejo de estado global
├── App.css              # Layout principal
└── index.css            # Reset y estilos base
```

---

## 🧩 Componentes creados y su responsabilidad

| Componente | Responsabilidad |
|---|---|
| **Header** | Barra superior fija con logo, buscador y acciones. Recibe `onNavigate` para cambiar de vista. |
| **Sidebar** | Panel lateral fijo con avatar del usuario, estadísticas y menú de navegación. Recibe `currentView` y `onNavigate`. |
| **Stories** | Muestra la fila de historias con avatares circulares. Recibe el array `stories` por props. |
| **Feed** | Renderiza la grilla de publicaciones en 3 columnas. Recibe `posts`, `loading`, `onSelectPost` y `onLike`. |
| **PostCard** | Tarjeta individual de publicación con imagen, usuario y botones de acción. Recibe `post`, `onSelect` y `onLike`. |
| **PostModal** | Modal que se abre al hacer clic en una publicación. Muestra imagen ampliada, caption, comentarios y permite agregar comentarios. Recibe `post`, `onClose` y `onLike`. |
| **ProfileView** | Vista completa del perfil del usuario con header de perfil, estadísticas y grilla de publicaciones al estilo Instagram. Recibe `posts` y `onSelectPost`. |

### ¿Por qué esta componentización?

Cada componente tiene una única responsabilidad (principio SRP). Esto permite:
- Reutilizar `PostCard` tanto en el feed como en el perfil.
- Mantener el modal (`PostModal`) completamente desacoplado del feed.
- Cambiar la vista entre Home y Profile sin recargar datos.

---

## 🔗 Comunicación mediante props

- `App.tsx` es el componente raíz que posee todo el estado global y lo distribuye hacia abajo.
- `posts` y `stories` se pasan como props a `Feed`, `Stories` y `ProfileView`.
- Las funciones `onLike`, `onSelectPost`, `onNavigate` se pasan como callbacks para que los hijos puedan modificar el estado del padre (lifting state up).
- `selectedPost` se pasa a `PostModal` para saber qué publicación mostrar.

---

## 🪝 Hooks utilizados

| Hook | Dónde | Para qué |
|---|---|---|
| `useState` | `App.tsx` | Guardar `posts`, `stories`, `loading`, `selectedPost`, `currentView` |
| `useState` | `PostModal.tsx` | Guardar `newComment` y `localComments` |
| `useEffect` | `App.tsx` | Realizar la petición a la API al montar el componente |
| `useEffect` | `PostModal.tsx` | Bloquear el scroll del body cuando el modal está abierto |

---

## 🌐 Consumo de API

Se utiliza **Axios** para consumir **The Cat API** (`https://api.thecatapi.com/v1/images/search`).

- Se solicitan 12 imágenes al cargar la página.
- Si la API falla, se usa **Cataas** (`https://cataas.com/cat`) como fallback.
- Las Stories también usan imágenes de Cataas.
- Todas las imágenes se rotan **-3 grados** (hacia la izquierda) mediante CSS `transform: rotate(-3deg)`.

---

## 🖼️ Visualización individual de publicaciones

Se resolvió mediante un **modal** (`PostModal`).

- Al hacer clic en cualquier imagen del feed o del perfil, se llama a `onSelectPost(post)`.
- `App.tsx` guarda el post en `selectedPost` (useState).
- `PostModal` recibe ese post y lo muestra con imagen ampliada, nombre de usuario, caption, likes, comentarios simulados y botones de interacción.
- El usuario puede agregar comentarios en tiempo real (useState local en el modal).
- Se cierra haciendo clic fuera del modal o en el botón X.

---

## 👤 Perfil de usuario emulado

El perfil está definido en `src/data/userData.ts` con datos fijos:

```ts
export const currentUser = {
  name: "Gato Lover",
  username: "@gato_lover0",
  verified: true,
  bio: "🐱 Cat enthusiast | Photographer | Sharing the best cat moments",
  followers: "121K",
  likes: "900K",
  ...
};
```

**Datos mostrados en el perfil:**
- Foto de perfil (imagen de gato de Cataas)
- Nombre de usuario con badge de verificado
- Cantidad de posts, seguidores y seguidos
- Biografía breve
- Botón "Edit Profile" y botón de configuración
- Grilla de todas las publicaciones cargadas desde la API

No se implementó login ni registro. El usuario ya está "logueado" al iniciar la app.

---

## 🎨 Estados para selección de publicaciones

```ts
const [selectedPost, setSelectedPost] = useState<Post | null>(null);
const [currentView, setCurrentView] = useState<"home" | "profile">("home");
```

- `selectedPost`: guarda la publicación seleccionada. Si es `null`, el modal no se muestra.
- `currentView`: controla si se muestra el feed (Home) o la vista de perfil.

---

## 📦 Dependencias principales

- **React 19** + **TypeScript**
- **Axios** — consumo de API
- **Vite** — bundler y dev server

---

## 📝 Instrucciones de entrega

- Repositorio: GitHub (subir carpeta `Tp6`)
- Figma: https://www.figma.com/es-es/comunidad/file/1235135369163092252/instagram-web-ui-recreated
- Para ejecutar: `npm install && npm run dev`

---

## 🔄 React Context

### 1. Información compartida

Se comparte la información del usuario actualmente logueado entre todos los componentes de la aplicación. El Context expone el objeto `user` con los siguientes datos:

- `name` — nombre completo del usuario
- `username` — nombre de usuario (ej: `@gato_lover0`)
- `verified` — si tiene el badge de verificado
- `bio` — biografía del perfil
- `followers` — cantidad de seguidores
- `likes` — cantidad de likes totales
- `avatar` — URL del avatar
- `postsCount` — cantidad de publicaciones

También expone `setUser`, la función para actualizar el usuario desde cualquier componente.

### 2. Archivo donde se creó el Context

```
src/context/UserContext.tsx
```

Este archivo contiene:
- La creación del Context con `createContext`
- El `UserProvider` que envuelve la aplicación y mantiene el estado
- El hook `useUser` que permite consumir el Context de forma simple

### 3. Componente contenedor del Provider

El Provider se ubica en `App.tsx`, envolviendo toda la aplicación:

```tsx
<UserProvider>
  <div className="app">
    ...
  </div>
</UserProvider>
```

Esto garantiza que todos los componentes dentro del árbol puedan acceder al usuario.

### 4. Componentes que utilizan `useContext`

Ambos consumen el Context a través del hook `useUser()`:

| Componente | Información que obtiene |
|---|---|
| **`Sidebar`** | `user.name`, `user.verified`, `user.username`, `user.followers`, `user.likes` — para mostrar el perfil en el panel lateral |
| **`ProfileView`** | `user.name`, `user.verified`, `user.username`, `user.bio`, `user.followers` — para mostrar el encabezado completo del perfil |

Ejemplo de uso en `Sidebar.tsx`:

```tsx
const { user } = useUser();
// luego en el JSX:
<div>{user.name}</div>
```

### 5. Justificación técnica

Antes de implementar Context, `Sidebar` y `ProfileView` importaban los datos del usuario directamente desde el archivo `userData.ts`. Eso funcionaba, pero tenía un problema: si el usuario cambiaba (por ejemplo, al editar su perfil), los componentes no se actualizaban porque los datos no eran estado de React.

Con Context, el usuario vive dentro de un `useState` en el `UserProvider`. Cualquier componente que llame a `useUser()` recibe siempre los datos actualizados, sin necesidad de pasar esa información manualmente de componente en componente mediante props.

Esto es especialmente útil porque `Sidebar` y `ProfileView` están separados en la jerarquía de componentes — ambos son hijos directos de `App`, y sin Context habría sido necesario pasar el mismo dato por props en paralelo a los dos. Con Context, ambos lo leen directamente del mismo lugar.

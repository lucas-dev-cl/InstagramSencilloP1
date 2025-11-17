# InstagramSencilloP1

Mini Instagram – Proyecto Full Stack
Este es un proyecto simple inspirado en Instagram, creado para practicar Node.js, Express, MySQL, JavaScript Vanilla, TailwindCSS y organización de un CRUD completo tanto para usuarios como para posts.
Incluye un backend modularizado y un frontend con formularios funcionales para crear, buscar y eliminar publicaciones.

Características principales: 

👤 Usuarios
- Crear usuarios con nombre, bio y avatar.
- Buscar usuarios por nombre o por ID.
- Modificar usuarios (nombre, bio y avatar).
- Eliminar usuarios.
- Validación de errores y mensajes visuales en frontend.

🖼️ Posts
- Crear posts con descripción, imagen y referencia al usuario.
- Buscar posts con filtros.
- Renderizado dinámico con nombre del usuario e imagen.
- Eliminar posts desde la interfaz.

📦 Tecnologías usadas
- Node.js + Express
- MySQL (conexión mediante pool)
- JavaScript (ES Modules) en frontend y backend
- TailwindCSS para estilos
- Fetch API para comunicación con el backend

Pendientes / Para mejorar
- Falta implementar scroll infinito o paginación real para los posts.
- Las publicaciones todavía no se pueden modificar, solo eliminar.
- Validar mejor ciertos inputs.
- Añadir un sistema de sesiones / autenticación real.

🧪 Objetivo del proyecto

Este proyecto lo hice para practicar:
- Rutas REST con Express
- CRUD completo con MySQL
- Comunicación frontend ↔ backend usando fetch
- Modularización del código
- Tailwind y estilos reutilizables

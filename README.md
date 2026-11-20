# 🛠️ Axioma Ergasterion — Plantilla de Portafolio & Blog para Astro

**Axioma Ergasterion** es una plantilla moderna, rápida y personalizable de **Portafolio Profesional / Estudio Creativo** con contacto directo vía **WhatsApp**, **Blog integrado** y panel de administración **Keystatic CMS**, construida con **Astro**, **Tailwind CSS v4** y **DaisyUI v5**.

Desarrollada por **[Proyectos Axioma](https://github.com/Proyectos-axioma/Axioma-Ergasterion)** bajo licencia **MIT**.

---

## ✨ Características Principales

- 💼 **Portafolio de Proyectos Dinámico:** Búsqueda en tiempo real, filtrado por categorías y herramientas/tecnologías (stack), metadatos de cliente y fecha, enlaces a demo en vivo y repositorio de código fuente, galería interactiva de hasta 5 imágenes secundarias, casos de estudio en MDX y proyectos relacionados.
- 💬 **Contacto Directo por WhatsApp:** Formulario de contacto integrado en la página de inicio que genera mensajes prellenados listos para enviar a tu número de WhatsApp.
- 📝 **Blog Completo con SEO y RSS:** Soporte para artículos destacados en portada, borradores (`draft`), tiempo de lectura, categorías, etiquetas, imágenes OpenGraph dinámicas, Sitemap y canal RSS (`/rss.xml`).
- 🖥️ **Panel Administrable (Keystatic CMS):** Creación y edición visual de proyectos del portafolio y artículos del blog en formato `.mdx` desde `/keystatic` (en modo local durante el desarrollo o conectado a GitHub en producción).
- 🌗 **Modo Claro / Oscuro sin Parpadeos:** Sistema de temas con DaisyUI v5 (`winter` y `dark` por defecto) con persistencia en `localStorage` y detección del tema del sistema.

---

## 🚀 Comandos del Proyecto

> **Requisitos previos:** Node.js v22.23.4+

Ejecuta los siguientes comandos desde la raíz del proyecto:

| Comando | Acción |
| :--- | :--- |
| `npm install` | Instala las dependencias del proyecto |
| `npm run dev` | Inicia el servidor de desarrollo en `http://localhost:4321` (con Keystatic activo en `/keystatic`) |
| `npm run build` | Compila el sitio para producción en `./dist/` |
| `npm run preview` | Previsualiza localmente la versión compilada |

---

## 🎨 Guía de Personalización

### 1. Datos Generales del Portafolio (`src/consts.ts`)
El primer paso para adaptar la plantilla es editar el archivo [`src/consts.ts`](./src/consts.ts):

```ts
export const SITE_TITLE = 'Axioma Ergasterion';
export const SITE_DESCRIPTION = 'Descripción de tu portafolio o estudio para buscadores (SEO)';
export const SITE_PROPIETARIO = 'Proyectos Axioma'; // Autor por defecto en el blog
export const SITE_CONTACTO = '525500000000'; // Número de WhatsApp
export const SITE_CORREO = 'hola@tuempresa.com';
export const GITHUB_REPO = 'Proyectos-axioma/Axioma-Ergasterion'; // usuario/repositorio para Keystatic
export const SITE_URL = 'https://tusitio.com'; // Dominio final de producción
export const Facebook = 'https://facebook.com/tu-usuario';
export const X = 'https://x.com/tu-usuario';
export const Instagram = 'https://instagram.com/tu-usuario';
```

### 2. Secciones de Inicio y Páginas Institucionales
Personaliza los textos de presentación y legales directamente en:
- **Hero (Portada):** [`src/components/Hero.astro`](./src/components/Hero.astro) *(ajusta el título principal, disponibilidad y llamada a la acción).*
- **Sobre Mí / Estudio:** [`src/components/Sobrenosotros.astro`](./src/components/Sobrenosotros.astro) *(reemplaza los textos de ejemplo entre corchetes `[...]`, pilares de servicio y agrega tu foto de perfil o estudio).*
- **Contacto:** [`src/components/Contacto.astro`](./src/components/Contacto.astro) *(actualiza tu ubicación/modalidad en la columna izquierda).*
- **Términos y Condiciones:** [`src/pages/terminos.astro`](./src/pages/terminos.astro) *(ajusta las políticas de contratación, anticipos, rondas de revisión y propiedad intelectual según tu país).*

### 3. Gestión de Proyectos y Artículos
Puedes administrar el contenido de dos formas:
1. **Desde el navegador (Recomendado):** Corre `npm run dev` y entra a `http://localhost:4321/keystatic` para crear, editar o borrar proyectos y artículos visualmente.
2. **Directamente en archivos `.mdx`:** Edita o agrega archivos en `src/content/proyectos/` y `src/content/blog/`.

---

## ⚠️ Puntos de Cuidado Importantes

Antes de modificar la estructura interna de la plantilla, ten mucho cuidado con los siguientes puntos para no romper funcionalidades:

### 1. Cambiar los Temas de DaisyUI (Claro / Oscuro)
Si deseas cambiar los temas `winter` (claro) y `dark` (oscuro) por otros temas de DaisyUI, **debes actualizarlos en 3 lugares al mismo tiempo**:
1. [`src/styles/global.css`](./src/styles/global.css) (en el bloque `@plugin "daisyui"`).
2. [`src/components/Header.astro`](./src/components/Header.astro) (constantes `TEMA_CLARO` y `TEMA_OSCURO` del script).
3. [`src/components/BaseHead.astro`](./src/components/BaseHead.astro) (constantes `TEMA_CLARO` y `TEMA_OSCURO` del script anti-parpadeo en el `<head>`).

> **Nota:** Si solo los cambias en `global.css` y olvidas actualizar los scripts, el botón de cambio de tema dejará de aplicar los colores correctamente.

### 2. Formato del Número de Teléfono (`SITE_CONTACTO`)
En [`src/consts.ts`](./src/consts.ts), la constante `SITE_CONTACTO` debe contener **únicamente números, incluyendo el código de país, sin el signo `+`, sin espacios ni guiones** (por ejemplo: `'525512345678'` para México).
- Este formato es indispensable para que la API de WhatsApp (`https://wa.me/...`) funcione sin errores.
- Si tu número no es de 12 dígitos (código de país de 2 dígitos + 10 dígitos locales), revisa la función `formatearTelefono()` en [`src/components/Contacto.astro`](./src/components/Contacto.astro) para ajustar la expresión regular visual.

### 3. Sincronización entre Keystatic y Astro Content Collections
Si agregas, renombras o eliminas algún campo de los proyectos o del blog:
- Debes reflejar el cambio tanto en [`keystatic.config.ts`](./keystatic.config.ts) (para el panel de administración) como en [`src/content.config.ts`](./src/content.config.ts) (validación con Zod en Astro).
- **Si agregas un campo en Keystatic pero no lo declaras en `src/content.config.ts`**, Astro lo ignorará y devolverá `undefined` al renderizar tus páginas.
- Todos los archivos de contenido utilizan extensión **`.mdx`**. No cambies la extensión de salida a `.md` ni uses `fields.document` (`.mdoc`) en `keystatic.config.ts`, o Keystatic dejará de listar los proyectos y artículos existentes.

### 4. Despliegue Estático vs. Despliegue con Keystatic en Producción (Netlify / Vercel)
Por defecto, en [`astro.config.mjs`](./astro.config.mjs), la integración `keystatic()` solo se carga en **modo desarrollo (`npm run dev`)**. Esto permite compilar el sitio como 100% estático (`npm run build`) para subirlo a **GitHub Pages** o cualquier hosting estático sin errores.

Si deseas que el panel `/keystatic` esté disponible en producción (por ejemplo, en **Netlify**) conectado a GitHub:
1. Instala el adaptador correspondiente: `npx astro add netlify` (o `@astrojs/vercel`).
2. En [`astro.config.mjs`](./astro.config.mjs), agrega `adapter: netlify()` y deja `keystatic()` fijo dentro del arreglo `integrations` (quitando la condición `isDev`).
3. Actualiza `GITHUB_REPO` y `SITE_URL` en [`src/consts.ts`](./src/consts.ts).
4. Entra a `/keystatic` en tu dominio desplegado para crear y conectar tu **GitHub App**, y configura en tu panel de Netlify las variables de entorno que te solicitará Keystatic:
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - `KEYSTATIC_SECRET`
   - `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`

---

## 📄 Licencia y Atribución (MIT)

Este proyecto se distribuye bajo la **Licencia MIT**. Eres libre de usar, copiar, modificar y distribuir esta plantilla para proyectos personales o comerciales.

### 🔗 Sobre el icono de GitHub en el Footer
En [`src/components/Footer.astro`](./src/components/Footer.astro), el icono de GitHub apunta por defecto a `https://github.com/Proyectos-axioma/Axioma-Ergasterion` como firma del autor original. 

Dependiendo de cómo gestiones el código de tu portafolio, tienes dos opciones:

**1. Si tu repositorio es público y quieres que el icono apunte a tu propio código:**
Puedes cambiar libremente ese enlace en [`src/components/Footer.astro`](./src/components/Footer.astro) importando `GITHUB_REPO` desde `../consts`:

```astro
---
import { Facebook, SITE_TITLE, X, Instagram, GITHUB_REPO } from '../consts';
---
<!-- ... -->
<a href={`https://github.com/${GITHUB_REPO}`}>
    <Icon name="tabler:brand-github" class="w-6 h-6 stroke-2" />
</a>
```

*Sugerencia:* Agradeceríamos mucho mantener el crédito y enlace a **[Proyectos Axioma](https://github.com/Proyectos-axioma/Axioma-Ergasterion)** dentro del archivo `README.md` de tu repositorio, aunque bajo la licencia MIT es completamente opcional.

**2. Si decides cerrar el código (repositorio privado) y quitar el icono del Footer:**
Si por motivos comerciales tu repositorio es privado y prefieres remover el icono de GitHub de la barra de redes sociales del pie de página, puedes hacerlo sin problema.

*Sugerencia:* Si lo deseas, puedes reubicar el crédito y enlace al repositorio original (`https://github.com/Proyectos-axioma/Axioma-Ergasterion`) en un lugar discreto del sitio (como un *"Desarrollado con Axioma Ergasterion"* en el Footer, en *Sobre Mí* o en *Términos y Condiciones*). Como indica la licencia MIT, esto no es obligatorio.

---

## 🙌 Créditos, Transparencia y Agradecimientos

- Creado y mantenido por **[Proyectos Axioma](https://github.com/Proyectos-axioma/Axioma-Ergasterion)**.
- Construido inicialmente a partir de la plantilla oficial **[Astro Starter Kit: Blog](https://github.com/withastro/astro/tree/main/examples/blog)** (bajo licencia MIT) y adaptado para incluir portafolio de proyectos y casos de estudio, integración con WhatsApp, Keystatic CMS, Tailwind CSS v4 y DaisyUI v5.
- El diseño original de la plantilla base de Astro estuvo inspirado en **[Bear Blog](https://github.com/HermanMartinus/bearblog/)** de [Herman Martinus](https://herman.bearblog.dev).
- 🤖 **Nota sobre el uso de IA:** Durante el desarrollo de esta plantilla se utilizó Inteligencia Artificial (Gemini Pro y Argon) para la creación de algunos componentes y revisar el código.
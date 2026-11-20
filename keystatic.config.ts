import { config, fields, collection } from '@keystatic/core';
import { GITHUB_REPO, SITE_PROPIETARIO } from './src/consts';
const isProd = import.meta.env.PROD;

export default config({
// Aqui cambiale dependiendo de tu usuario y la repo, si no, no te deja accerder, revisa consts.ts
    storage: isProd 
    ? {
        kind: 'github',
        repo: GITHUB_REPO, 
      }
    : {
        kind: 'local',
      },
    collections: {
// --- COLECCIÓN DE PROYECTOS (PORTFOLIO) ---
        proyectos: collection({
            label: 'Proyectos',
            slugField: 'nombre', // El nombre del archivo se generará a partir del nombre del proyecto
            path: 'src/content/proyectos/*',
            format: { contentField: 'content' }, // Separa el frontmatter del contenido Markdown
            schema: {
                nombre: fields.slug({ name: { label: 'Nombre del Proyecto' } }),
                descripcion: fields.text({ label: 'Descripción corta (Resumen para tarjetas)', multiline: true }),
                cliente: fields.text({ label: 'Cliente / Contexto (Opcional, ej. Proyecto Personal o Nombre de Empresa)' }),
                fecha: fields.date({ label: 'Fecha de realización (Opcional)' }),
                categorias: fields.array(
                    fields.text({ label: 'Categoría' }),
                    { label: 'Categorías (ej. Desarrollo Web, Diseño UI/UX, Arquitectura)', itemLabel: props => props.value }
                ),
                herramientas: fields.array(
                    fields.text({ label: 'Herramienta / Tecnología' }),
                    { label: 'Herramientas, Tecnologías o Disciplinas (ej. Astro, Figma, Blender)', itemLabel: props => props.value }
                ),
// Keystatic guardará las imágenes directamente en tu carpeta de assets
                imagenPrincipal: fields.image({
                    label: 'Imagen Principal / Portada',
                    directory: 'src/assets/proyectos',
                    publicPath: '../../assets/proyectos/'
                }),
                imagenesSecundarias: fields.array(
                    fields.image({
                        label: 'Imagen',
                        directory: 'src/assets/proyectos',
                        publicPath: '../../assets/proyectos/'
                    }),
                    { label: 'Galería Secundaria (Máximo 5 fotos)' }
                ),
                urlDemo: fields.text({ label: 'URL de Demo / Proyecto en vivo (Opcional)' }),
                urlCodigo: fields.text({ label: 'URL de Código Fuente / Repositorio (Opcional)' }),
                destacado: fields.checkbox({ label: '¿Destacar en la página de inicio?', defaultValue: false }),
// Este es el campo grande de texto donde el cliente puede escribir el caso de estudio usando negritas, listas, etc.
                content: fields.mdx({
                    label: 'Caso de estudio / Detalles completos del proyecto',
                    options: {
                        image: {
                            directory: 'src/assets/proyectos',
                            publicPath: '../../assets/proyectos/'
                        }
                    }
                }),
            },
        }),
// --- COLECCIÓN DEL BLOG ---
        blog: collection({
            label: 'Blog',
            slugField: 'title',
            path: 'src/content/blog/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Título del artículo' } }),
                seoTitle: fields.text({ label: 'Título SEO (Opcional - para Google)' }),
                description: fields.text({ label: 'Resumen (Descripción para tarjetas)', multiline: true }),
                pubDate: fields.date({ label: 'Fecha de publicación' }),

                updatedDate: fields.date({ label: 'Fecha de actualización (Opcional)' }),
                heroImage: fields.image({
                    label: 'Imagen de Portada',
                    directory: 'src/assets/blog',
                    publicPath: '../../assets/blog/'
                }),
            
                author: fields.text({ label: 'Autor', defaultValue: SITE_PROPIETARIO }),
                categoria: fields.text({ label: 'Categoría' }),
            
                tags: fields.array(
                    fields.text({ label: 'Etiqueta' }),
                    { label: 'Etiquetas', itemLabel: props => props.value }
                ),
            
                draft: fields.checkbox({ label: 'Borrador (Ocultar al público)', defaultValue: false }),
                destacado: fields.checkbox({ label: '¿Fijar en portada del blog?', defaultValue: false }),
                tiempoLectura: fields.number({ label: 'Tiempo estimado de lectura (minutos)' }),

                content: fields.mdx({
                    label: 'Contenido del artículo',
                    options: {
                        image: {
                            directory: 'src/assets/blog',
                            publicPath: '../../assets/blog/'
                        }
                    }
                }),
            },
        }),
    },
});
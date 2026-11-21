import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { SITE_PROPIETARIO } from './consts';
import PlaceholderImage from './assets/Placeholder.svg';

// Helpers a prueba de errores de usuario o valores vacíos/null generados por CMS (Keystatic)
const limpiarTextoOpcional = (val: unknown) =>
	typeof val === 'string' && val.trim() === '' ? undefined : val === null ? undefined : val;

const textoOpcional = z.preprocess(limpiarTextoOpcional, z.string().optional());
const urlOpcional = z.preprocess(limpiarTextoOpcional, z.string().url().optional());
const fechaOpcional = z.preprocess(
	(val) => (val === null || val === '' ? undefined : val),
	z.coerce.date().optional()
);
const fechaConFallbackHoy = z.preprocess(
	(val) => (val === null || val === '' || val === undefined ? new Date() : val),
	z.coerce.date()
);
const numeroPositivoOpcional = z.preprocess(
	(val) => (val === null || val === '' ? undefined : val),
	z.number().positive().optional()
);
const listaTextosLimpia = z.preprocess(
	(val) =>
		Array.isArray(val)
			? val.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
			: [],
	z.array(z.string()).default([])
);

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
// LO OBLIGATORIO (Con respaldos seguros por si alguien edita el MDX a mano y deja algo vacío)
			title: z.preprocess(
				(val) => (typeof val === 'string' && val.trim() !== '' ? val : 'Artículo sin título'),
				z.string()
			),
			description: z.preprocess(
				(val) => (typeof val === 'string' ? val : ''),
				z.string().default('')
			),
			pubDate: fechaConFallbackHoy,

// LO OPCIONAL (Limpia null o cadenas vacías "" sin romper el build)
// Fechas y Estado
			updatedDate: fechaOpcional,
			draft: z.preprocess((val) => Boolean(val), z.boolean().default(false)), // Ocultar borradores al público
			destacado: z.preprocess((val) => Boolean(val), z.boolean().default(false)), // Fijar en portada del blog
			tiempoLectura: numeroPositivoOpcional, // Tiempo estimado de lectura (minutos)

// Multimedia
			heroImage: z.preprocess(limpiarTextoOpcional, image().optional()), // Imagen ancha de cabecera
			thumbnail: z.preprocess(limpiarTextoOpcional, image().optional()), // Imagen cuadrada para la tarjeta (si no hay, usas heroImage)
			videoUrl: urlOpcional, // Por si quieren clavar un video de YouTube

// Taxonomía (Filtros)
			categoria: textoOpcional,
			categories: listaTextosLimpia,
			tags: listaTextosLimpia,

// Autoría (Si el usuario borra el autor en Keystatic, regresa automáticamente a SITE_PROPIETARIO)
			author: z.preprocess(
				(val) => (typeof val === 'string' && val.trim() !== '' ? val : SITE_PROPIETARIO),
				z.string().default(SITE_PROPIETARIO)
			),
			authorRole: textoOpcional,
			authorImage: z.preprocess(limpiarTextoOpcional, image().optional()),

// SEO
			seoTitle: textoOpcional,
			metaTitle: z.preprocess(limpiarTextoOpcional, z.string().max(70).optional()), // Título optimizado solo para Google
			metaDescription: z.preprocess(limpiarTextoOpcional, z.string().max(160).optional()),
			canonicalURL: urlOpcional, // Para evitar contenido duplicado

// Control de Interfaz
			showToc: z.preprocess((val) => (val === null || val === undefined ? true : Boolean(val)), z.boolean().default(true)), // ¿Mostrar tabla de contenidos?
			relatedPosts: listaTextosLimpia, // Slugs de otros posts para "Te podría interesar"
		}),
});

// Valores para los proyectos del portfolio
const proyectos = defineCollection({
	loader: glob({ base: './src/content/proyectos', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			nombre: z.preprocess(
				(val) => (typeof val === 'string' && val.trim() !== '' ? val : 'Proyecto sin nombre'),
				z.string()
			),
			descripcion: z.preprocess(
				(val) => (typeof val === 'string' ? val : ''),
				z.string().default('')
			),
			cliente: textoOpcional,
			fecha: fechaOpcional,
			categorias: z.preprocess(
				(val) => {
					const limpios = Array.isArray(val)
						? val.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
						: [];
					return limpios.length > 0 ? limpios : ['General'];
				},
				z.array(z.string()).default(['General'])
			),
			herramientas: listaTextosLimpia,
// Si el usuario olvida subir la imagen principal editando a mano, usa Placeholder.svg para que no explote Astro <Image />
			imagenPrincipal: z.preprocess(
				(val) => (typeof val === 'string' && val.trim() !== '' ? val : PlaceholderImage),
				z.union([image(), z.custom<typeof PlaceholderImage>()])
			),
// Filtramos elementos vacíos/nulos y recortamos a máximo 5 para que nunca falle la compilación si suben de más
			imagenesSecundarias: z.preprocess(
				(val) =>
					Array.isArray(val)
						? val.filter((item): item is string => typeof item === 'string' && item.trim().length > 0).slice(0, 5)
						: undefined,
				z.array(image()).max(5).optional()
			),
			urlDemo: textoOpcional,
			urlCodigo: textoOpcional,
			destacado: z.preprocess((val) => Boolean(val), z.boolean().default(false)),
		}),
});

// Exportamos ambas colecciones
export const collections = { blog, proyectos };

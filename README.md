# 🚀 BitcoinForWifi - Blog Profesional de Bitcoin

Un blog moderno y profesional sobre Bitcoin y criptomonedas construido con Astro.js, optimizado para SEO y rendimiento.

## ✨ Características Principales

- 🎨 **Diseño Moderno**: Interfaz oscura con acentos naranja de Bitcoin
- ⚡ **Ultra Rápido**: Static site generation con Astro.js
- 📱 **Totalmente Responsive**: Perfecto en todos los dispositivos
- 🎯 **SEO Optimizado**: Sitemap.xml, robots.txt, meta tags, structured data
- 📝 **Blog Dinámico**: Múltiples artículos sobre Bitcoin
- 🔍 **Búsqueda Integrada**: Funcionalidad de búsqueda en tiempo real
- 🍪 **Cookie Consent**: Banner de cookies GDPR compliant
- � **Multiidioma**: Soporte para inglés y español

## 🛠️ Stack Tecnológico

- **Astro.js** - Framework web moderno
- **Tailwind CSS** - Framework de CSS utility-first
- **TypeScript** - Tipado estático
- **MDX** - Markdown con componentes

## 📊 SEO Implementation

### Sitemap.xml
- Generación automática durante el build
- Jerarquía de prioridades:
  - Home: `priority="1.0"`
  - Blog: `priority="0.9"`
  - Posts: `priority="0.8"`
  - About/Contact: `priority="0.4"`
  - Legal pages: `priority="0.3"`

### Robots.txt
- Permite todos los crawlers: `User-agent: * Allow: /`
- Incluye referencia al sitemap

### Meta Tags
- Open Graph para redes sociales
- Twitter Cards
- Structured Data (JSON-LD)
- Meta tags SEO completos

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+
- npm

### Instalación
```bash
git clone https://github.com/onar1710/bitcoinforwifi.com.git
cd bitcoinforwin-2astro
npm install
```

### Desarrollo
```bash
npm run dev      # Servidor en http://localhost:4321
npm run build    # Build para producción
npm run preview  # Previsualizar build
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── SEO.astro           # Componente SEO avanzado
│   └── SimpleSEO.astro     # SEO simplificado
├── layouts/
│   └── Layout.astro        # Layout principal
├── pages/
│   ├── index.astro         # Home
│   ├── blog.astro          # Lista de posts
│   ├── blog/[slug].astro   # Posts individuales
│   ├── about.astro         # Acerca de
│   ├── contact.astro       # Contacto
│   ├── sitemap.xml.ts      # Sitemap dinámico
│   └── legal pages/        # Privacy, Terms, etc.
├── data/
│   └── blog-posts.ts       # Datos de posts
├── utils/                  # Utilidades
└── styles/                 # Estilos globales
```

## 🎨 Personalización

### Configuración del Sitio
Editar `src/config.js`:
```javascript
export const SITE = {
  title: 'BitcoinForWifi',
  description: '...',
  url: 'https://bitcoinforwifi.com',
  // ...
};
```

### Añadir Posts
1. Editar `src/data/blog-posts.ts`
2. Añadir nuevo post al array `blogPosts`
3. Crear archivo `.astro` correspondiente en `src/pages/blog/`

## 🌐 Despliegue

### GitHub Pages
1. Ir a Settings > Pages
2. Seleccionar fuente: Deploy from a branch
3. Branch: `master` y folder: `/root`
4. El sitio estará disponible en: `https://onar1710.github.io/bitcoinforwifi.com/`

### Vercel/Netlify
1. Conectar repositorio
2. Build command: `npm run build`
3. Publish directory: `dist`

## 📈 Performance

- **Lighthouse Score**: 95+ (Performance, SEO, Accessibility)
- **Core Web Vitals**: Optimizado
- **Bundle Size**: < 100KB gzipped
- **First Contentful Paint**: < 1.5s

## 🔍 Características SEO

- ✅ Sitemap.xml automático
- ✅ Robots.txt optimizado
- ✅ Meta tags completos
- ✅ Structured Data
- ✅ Open Graph
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ Alt tags en imágenes
- ✅ Semantic HTML5

## 📱 Mobile First

- Responsive design para todos los dispositivos
- Touch-friendly interactions
- Optimizado para mobile SEO
- Fast loading en 3G/4G

## 🤝 Contribuir

1. Fork el repositorio
2. Crear feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📄 Licencia

MIT License - Ver archivo LICENSE

## 🌟 Live Demo

👉 **https://bitcoinforwifi.com** (dominio principal)

---

**Construido con ❤️ para la comunidad Bitcoin**

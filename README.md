# 🚀 Bitcoin Blog - Sitio Web Profesional en Astro.js

Un blog moderno y profesional sobre Bitcoin y criptomonedas construido con Astro.js, Tailwind CSS y las mejores prácticas de desarrollo web.

## ✨ Características

- 🎨 **Diseño Impresionante**: Interfaz moderna con tema oscuro y acentos de Bitcoin
- ⚡ **Rendimiento Ultra Rápido**: Construido con Astro.js para máxima velocidad
- 📱 **Totalmente Responsive**: Perfecto en todos los dispositivos
- 🎯 **SEO Optimizado**: Meta tags, structured data y más
- 📝 **Sistema de Blog**: Soporte para Markdown y MDX
- 🎭 **Animaciones Suaves**: Transiciones y efectos hover elegantes
- 🌙 **Tema Oscuro**: Diseño moderno fácil para los ojos

## 🛠️ Tecnologías Utilizadas

- **Astro.js** - Framework web moderno
- **Tailwind CSS** - Framework de CSS utility-first
- **TypeScript** - Tipado estático para mejor desarrollo
- **MDX** - Markdown con componentes React
- **Responsive Design** - Mobile-first approach

## 📁 Estructura del Proyecto

```
bitcoinforwin-2astro/
├── src/
│   ├── components/          # Componentes reutilizables
│   ├── layouts/            # Layouts del sitio
│   ├── pages/              # Páginas del sitio
│   │   ├── index.astro     # Página principal
│   │   ├── blog.astro      # Lista de artículos
│   │   ├── about.astro     # Acerca de
│   │   └── blog/[slug].astro # Artículos individuales
│   ├── styles/             # Estilos CSS
│   └── config.js           # Configuración del sitio
├── public/                 # Archivos estáticos
├── astro.config.mjs        # Configuración de Astro
├── tailwind.config.mjs     # Configuración de Tailwind
└── package.json           # Dependencias del proyecto
```

## 🚀 Empezando

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd bitcoinforwin-2astro
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:4321`

### Comandos Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye el sitio para producción
npm run preview  # Previsualiza el sitio construido
npm run astro    # Ejecuta comandos de Astro CLI
```

## 🎨 Personalización

### Colores del Tema

Los colores están definidos en `tailwind.config.mjs`:

```javascript
colors: {
  bitcoin: {
    orange: '#F7931A',  // Color oficial de Bitcoin
    dark: '#4A4A4A',
    light: '#FFD700'
  }
}
```

### Configuración del Sitio

Modifica `src/config.js` para personalizar:

- Título y descripción del sitio
- URLs de redes sociales
- Metadatos SEO
- Configuración de paginación

### Añadir Nuevos Artículos

Los artículos se gestionan en `src/pages/blog/[slug].astro`. Para añadir nuevos artículos:

1. Añade el slug al array `posts` en `getStaticPaths()`
2. Incluye título, descripción, fecha y contenido
3. El contenido se escribe en formato Markdown

## 📱 Responsive Design

El sitio está optimizado para:

- 📱 Móviles (320px+)
- 📟 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Pantallas grandes (1280px+)

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente el proyecto Astro
3. Despliega automáticamente en cada push

### Netlify

1. Conecta tu repositorio a Netlify
2. Configura el comando de build: `npm run build`
3. Configura el directorio de publish: `dist`

### Otros

El sitio puede desplegarse en cualquier plataforma estática como:

- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

## 🎯 Características Técnicas

- **Static Site Generation**: Generación estática para máxima velocidad
- **Component Islands**: Hidratación selectiva de componentes
- **Image Optimization**: Optimización automática de imágenes
- **Code Splitting**: División de código automática
- **SEO Friendly**: Meta tags, structured data, sitemap

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [Astro](https://astro.build/) - El framework web increíblemente rápido
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
- [Bitcoin](https://bitcoin.org/) - La tecnología revolucionaria que inspira este proyecto

---

**Construido con ❤️ y ☕ por la comunidad Bitcoin**

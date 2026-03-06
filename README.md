# M14 Studio

Productora audiovisual de primer nivel · Santiago, Chile

## 🚀 Stack

- **HTML + CSS + JavaScript vanilla** (archivo único)
- **Librerías CDN:**
  - GSAP 3.12.5 + ScrollTrigger
  - Lenis 1.1.13 (smooth scroll)
- **Google Fonts:**
  - Cormorant Garamond (display, headings)
  - DM Sans (body, UI)

## 🎨 Colores

- `--negro`: #0A0A0A (fondo)
- `--vino`: #7A0012 (acento)
- `--crema`: #F5F0E8 (texto)

## ✨ Características

- ✅ Lenis smooth scroll cinematográfico (lerp 0.08)
- ✅ GSAP ScrollTrigger sincronizado con Lenis
- ✅ Cursor custom de dos capas:
  - Punto pequeño (8px) seguimiento exacto
  - Círculo exterior (40px) con delay suave
  - Hover effect: crece a 64px y cambia a vino
- ✅ Anchor links (#portfolio, #sobre-nosotros, #contacto)
- ✅ Animaciones GSAP de entrada

## 📂 Estructura

```
m14studio-web/
└── index.html       # Archivo único (HTML + CSS + JS inline)
```

## 🌐 Despliegue (Cloudflare Pages)

Repositorio: `EmilioNualart/m14studio-web` (branch: main)

### Publicar cambios:

```bash
git add .
git commit -m "mensaje descriptivo"
git push
```

Cloudflare Pages detecta el push y despliega automáticamente.

## 💻 Desarrollo local

Simplemente abre el archivo en tu navegador:

```bash
open index.html
```

O usa un servidor local:

```bash
# Python
python -m http.server 8000

# Node.js (npx)
npx serve
```

## 📦 Navegación

Las secciones se navegan con anchor links:

- `#home` - Hero principal
- `#portfolio` - Portfolio de proyectos
- `#sobre-nosotros` - Sobre M14 Studio
- `#contacto` - Contacto

## 🎯 Estado

✅ Estructura base con Lenis + cursor custom
⏳ Contenido completo pendiente

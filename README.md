# Minimalist Developer Portfolio

A clean, typography-focused personal portfolio website built with Astro.

![Minimal Developer Portfolio](https://fault.wtf/)

## 💼 Overview

This project is a minimalist portfolio website designed for developers who appreciate clean design and typography. It features:

- Simple, distraction-free layout
- Variable typography using Recursive font
- Responsive design with dark mode support
- Fast performance with Astro's partial hydration

## 🚀 Project Structure

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── images and SVGs
│   ├── components/
│   │   └── Main.astro (main portfolio component)
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── astro.config.mjs
```

## 🧰 Tech Stack

- [Astro](https://astro.build/) - The web framework for content-driven websites
- [React](https://react.dev/) - For interactive components (via @astrojs/react)
- [MDX](https://mdxjs.com/) - For content with embedded components
- [Vercel](https://vercel.com/) - Deployment platform with analytics
- [Recursive Font](https://www.recursive.design/) - Variable font for flexible typography

## 🎨 Design Principles

This portfolio follows minimalist design principles:

- Content-first approach
- Typographic hierarchy using variable fonts
- Thoughtful white space
- Minimal color palette
- Subtle animations and transitions
- Responsive layout for all devices

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`           | Installs dependencies                            |
| `pnpm dev`               | Starts local dev server at `localhost:4321`      |
| `pnpm build`             | Build your production site to `./dist/`          |
| `pnpm preview`           | Preview your build locally, before deploying     |
| `pnpm astro ...`         | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help`   | Get help using the Astro CLI                     |

## ✏️ Customization

To customize this portfolio for your own use:

1. Update the content in `src/components/Main.astro`
2. Modify styling variables in the `<style>` section
3. Update metadata in `src/layouts/Layout.astro`
4. Replace or customize the favicon in `/public/favicon.svg`
5. Configure deployment options in `astro.config.mjs`

## 🔄 Dark Mode

The portfolio automatically switches between light and dark modes based on system preferences using CSS media queries.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

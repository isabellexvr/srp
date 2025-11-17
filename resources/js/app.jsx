import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import "./app.css"

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    const key = `./Pages/${name}.jsx`;
    const page = pages[key];
    if (!page) {
      console.error(`[Inertia] Página não encontrada: ${name}. Procurado em ${key}. Arquivos disponíveis:`, Object.keys(pages));
      throw new Error(`Página Inertia "${name}" não encontrada.`);
    }
    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
  progress: {
    color: '#4B5563',
  },
});

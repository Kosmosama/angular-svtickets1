import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'auth/**', renderMode: RenderMode.Server },
  {
    path: 'error',
    renderMode: RenderMode.Server,
    status: 404,
    headers: {
      'Cache-Control': 'no-cache',
    },
  },
  { path: '**', renderMode: RenderMode.Client },
];

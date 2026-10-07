# ADR 0001: Monorepo con npm workspaces

- Estado: aceptada
- Fecha: 2026-10-07

## Contexto

Senda Business necesita un backend propio (empresas, usuarios corporativos, pagos) que comparte modelo de datos y contratos de API con la web. Hasta ahora el repositorio era una sola app Next.js con su propio Prisma sobre SQLite. El bot de WhatsApp tiene su repositorio y su ciclo de despliegue, y no se mezcla con este.

## Decisión

1. **npm workspaces** (`apps/*`, `packages/*`), sin Turborepo ni Nx. El equipo ya usa npm y el tamaño actual no justifica otra herramienta; se puede sumar caché de tareas más adelante sin mover carpetas.
2. **NestJS** para `apps/backend-business`: módulos, inyección de dependencias y guards/filters nativos encajan con la separación por capas y facilitan testear servicios aislados.
3. **PostgreSQL + Prisma** en un único paquete `@senda/database`, consumido por frontend y backend. Un solo schema evita que dos apps diverjan sobre las mismas tablas.
4. **zod en `@senda/shared`** para DTOs: el mismo schema valida en el backend y puede validar formularios en el frontend.
5. **Paquetes compilados a CommonJS** (`dist/`) en lugar de importar TypeScript fuente: funcionan igual en Next.js, NestJS y Jest sin configuración de transpilación extra.
6. **`contracts/` como workspace de Cargo** independiente de npm.

## Consecuencias

- `npm install` en la raíz compila `packages/*` (`postinstall`), así las apps encuentran tipos y JS listos.
- Vercel debe apuntar su Root Directory a `apps/frontend`.
- El cliente Prisma se genera en `node_modules` y deja de versionarse.
- La migración inicial asume una base PostgreSQL vacía; los datos de SQLite locales no se migran.
- Los endpoints corporativos existen como contrato (rutas, DTOs, errores) antes de tener lógica, y responden `501` hasta implementarse.

# Desarrollo local

Requisitos: Node.js 20.12 o superior, npm 11, Docker (para PostgreSQL) y Rust con el target `wasm32v1-none` (solo para contratos).

## Primer arranque

```bash
npm install                                   # instala todo y compila packages/*
cp packages/database/.env.example packages/database/.env
cp apps/frontend/.env.example apps/frontend/.env
cp apps/backend-business/.env.example apps/backend-business/.env

npm run db:up                                 # PostgreSQL 16 en 127.0.0.1:5432
npm run db:migrate:deploy                     # aplica las migraciones
```

Cada entorno tiene su propio `.env.example`; los `.env` reales están en `.gitignore`.

## Comandos

| Comando (desde la raíz) | Qué hace |
|---|---|
| `npm run dev:frontend` | Next.js en `http://localhost:3000` |
| `npm run dev:backend` | NestJS en `http://localhost:4000/v1` con recarga |
| `npm run build` | Compila todos los workspaces |
| `npm run typecheck` | Verifica tipos en todos los workspaces |
| `npm run lint` | Lint del frontend |
| `npm test` | Tests unitarios y e2e del backend |
| `npm run db:up` / `db:down` | Levanta o baja PostgreSQL local |
| `npm run db:migrate:dev` | Crea una migración nueva a partir del schema |
| `npm run db:migrate:deploy` | Aplica migraciones pendientes |

Para Prisma Studio: `npm run db:studio -w @senda/database`.

## Cambios en el schema

1. Editá `packages/database/prisma/schema.prisma`.
2. `npm run db:migrate:dev -- --name descripcion_corta` genera la migración SQL.
3. `npm run build -w @senda/database` regenera el cliente y los tipos.
4. Commiteá el schema y la carpeta de la migración juntos.

## Contratos Soroban

```bash
cd contracts
cargo test                                            # tests nativos
cargo build --target wasm32v1-none --release          # WASM optimizado
```

El WASM queda en `contracts/target/wasm32v1-none/release/business_payments.wasm`. Para desplegar en testnet:

```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/business_payments.wasm \
  --source <identidad> --network testnet \
  -- --token <CONTRACT_ID_DEL_SAC>
```

Guardá la dirección resultante en `BUSINESS_PAYMENTS_CONTRACT_ID` del backend.

En equipos Windows con Smart App Control activo, cargo no puede ejecutar sus build scripts. Usá WSL o un contenedor (`docker run --rm -v "$PWD:/work" -w /work rust:1-slim cargo test`).

## Deploy

- **Frontend (Vercel):** el Root Directory del proyecto debe ser `apps/frontend`. Vercel detecta los npm workspaces e instala desde la raíz.
- **Backend:** `npm run build:backend` y `node apps/backend-business/dist/main.js`, con las variables de `.env.example` definidas en el entorno y `npm run db:migrate:deploy` antes de cada release.

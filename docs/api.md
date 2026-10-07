# API de backend-business

Base: `http://localhost:4000/v1` en desarrollo. Todas las respuestas incluyen el header `x-request-id`.

## Contrato de errores

Toda respuesta no 2xx tiene esta forma (tipo `ApiErrorResponse` en `@senda/shared`):

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The request is invalid.",
    "requestId": "0f6b21b1-f795-4f3e-98ee-08b5ac5fca00",
    "details": [{ "path": "email", "message": "Invalid email" }]
  }
}
```

| `code` | HTTP | Cuándo |
|---|---|---|
| `VALIDATION_FAILED` | 400 | Body o parámetros inválidos, JSON mal formado |
| `UNAUTHENTICATED` | 401 | Falta sesión válida |
| `FORBIDDEN` | 403 | Sin permiso sobre el recurso |
| `NOT_FOUND` | 404 | Ruta o recurso inexistente |
| `CONFLICT` | 409 | Choque con el estado actual (p. ej. email ya registrado) |
| `PAYLOAD_TOO_LARGE` | 413 | Body mayor a 100 kB |
| `RATE_LIMITED` | 429 | Se superó el límite de requests |
| `NOT_IMPLEMENTED` | 501 | Endpoint definido pero todavía no construido |
| `SERVICE_UNAVAILABLE` | 503 | Dependencia caída (p. ej. PostgreSQL) |
| `INTERNAL` | 500 | Error inesperado; el detalle queda solo en los logs |

## Endpoints

### Health

| Método | Ruta | Respuesta |
|---|---|---|
| GET | `/health` | `200 { "status": "ok", "uptimeSeconds": 8 }` |
| GET | `/health/ready` | `200 { "status": "ready", "checks": { "database": "up" } }` o `503` |

No consumen rate limit, para que los balanceadores puedan consultarlos seguido.

### Auth

Límite propio: 10 requests por minuto por IP.

| Método | Ruta | Body | Estado |
|---|---|---|---|
| POST | `/auth/register` | `{ email, password (12-128), fullName? }` | `501` |
| POST | `/auth/login` | `{ email, password }` | `501` |

### Companies

| Método | Ruta | Body | Estado |
|---|---|---|---|
| POST | `/companies` | `{ legalName, taxId?, country (ISO alpha-2) }` | `501` |
| GET | `/companies/:id` | — | `501` |

### Payments

| Método | Ruta | Body | Estado |
|---|---|---|---|
| POST | `/payments/intents` | `{ companyId, destination (G...), asset ("USDC" \| "XLM"), amount, memo? }` | `501` |

`amount` es un string decimal positivo con hasta 7 decimales (precisión de Stellar), para no perder precisión con `number`. `memo` admite hasta 28 caracteres (límite de memo de texto de Stellar).

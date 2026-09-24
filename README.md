# API Gateway (Node.js + Express)

A lightweight, config-driven API gateway written in TypeScript. It sits in front of your services and routes each incoming request to the right backend based on a single routes file, applying security headers and CORS in one place.

> **Status:** prototype / learning project. Proxying works; the authentication layer is a stub that I'm still implementing (see [Roadmap](#roadmap)).

## Why I built it

When a frontend talks to several backend services, every service ends up repeating the same concerns: CORS, security headers, auth checks. I wanted to understand how a gateway centralises that, so I built a minimal one on top of Express and `http-proxy-middleware` instead of reaching for a hosted product.

## How it works

```
Client ──► Gateway (:3000)
             │  helmet (security headers)
             │  cors (allowed frontend origin)
             │  auth check  (routes with auth: true)
             ▼
          /auth/*  ──► https://auth-service.example.com
          /users/* ──► https://users-service.example.com
```

Every route is declared in [`src/routes.ts`](src/routes.ts). Each entry says which path prefix to match, whether it needs authentication, and where to forward it:

```ts
export const routes: IRoute[] = [
  {
    url: "/auth",
    auth: true,
    proxy: {
      target: "https://auth-service.example.com",
      changeOrigin: true,
      pathRewrite: { "^/auth": "" },   // /auth/login → /login on the target
    },
  },
];
```

`proxy` accepts any [`http-proxy-middleware` option](https://github.com/chimurai/http-proxy-middleware#options), so path rewrites, headers and response hooks are configured per route without touching the server code.

## Tech stack

- **Node.js + TypeScript**
- **Express 4** – HTTP server
- **http-proxy-middleware 3** – request forwarding
- **helmet** – secure HTTP headers
- **cors** – origin allow-list for the frontend
- **dotenv** – configuration via environment variables

## Project structure

```
index.ts              # entry point: loads .env and starts the server
src/
  server.ts           # creates the Express app and wires the middleware
  routes.ts           # the route table (the only file you edit to add a service)
  type.ts             # IRoute type
  lib/cors.ts         # CORS options
  utils/proxy.ts      # registers one proxy per route
  utils/auth.ts       # auth hook for routes with auth: true
```

## Getting started

Requirements: Node.js 20+

```bash
git clone https://github.com/raburuz/api-gateway-nodejs.git
cd api-gateway-nodejs
npm install
cp .env.example .env
npm run dev
```

The gateway starts on `http://localhost:3000`.

### Environment variables

| Variable              | Description                               | Default                 |
| --------------------- | ----------------------------------------- | ----------------------- |
| `PORT`                | Port the gateway listens on               | `3000`                  |
| `FRONTEND_DOMAIN_URL` | Origin allowed by CORS (your frontend)    | `http://localhost:3000` |

## Roadmap

- [ ] JWT validation for routes with `auth: true`
- [ ] Rate limiting per route
- [ ] Request logging and a `/health` endpoint
- [ ] Integration tests with Vitest + Supertest
- [ ] Dockerfile and GitHub Actions CI

## License

ISC

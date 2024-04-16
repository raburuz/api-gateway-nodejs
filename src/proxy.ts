/* EXPRESS */
import { Router } from 'express';
/* LIBRARIES */
import { createProxyMiddleware } from 'http-proxy-middleware';
/* APP */
import { routes } from './routes';

export const apiProxy = () => {

  const router = Router();

  routes.forEach( route => {
    router.use(route.url, createProxyMiddleware(route.proxy))
  })
}
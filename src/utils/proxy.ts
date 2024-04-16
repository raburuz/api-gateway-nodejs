/* EXPRESS */
import { Application, Router } from 'express';
/* LIBRARIES */
import { createProxyMiddleware } from 'http-proxy-middleware';
/* APP */
import { IRoute } from '@/type';

export const useApiProxy = ( app: Application, routes: IRoute[] ) => {

  routes.forEach( route => {
    app.use(route.url, createProxyMiddleware(route.proxy))
  })
}
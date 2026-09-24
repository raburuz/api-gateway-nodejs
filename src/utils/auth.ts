import { Application, Request, Response, NextFunction } from 'express';
import { IRoute } from '@/type';

// Placeholder: runs before the proxy on routes with `auth: true`.
const checkAuth = (req: Request, res: Response, next: NextFunction) => next();

export const useAuth = (app: Application, routes: IRoute[]) => {
  routes.filter(r => r.auth).forEach(route => app.use(route.url, checkAuth));
};

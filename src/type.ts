import { Options } from 'http-proxy-middleware';

export interface IRoute {
  url: string,
  auth: boolean,
  proxy: Options
}
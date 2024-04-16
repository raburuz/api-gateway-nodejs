/* EXPRESS */
import express, { Application } from "express"

/* Libraries */
import helmet from "helmet";
import cors from "cors"

/* APP */
import { useApiProxy } from "./utils/proxy";
import { useAuth } from "./utils/auth";
import { corsOptions } from "./lib/cors";
import { routes } from "./routes"; 

export const server = () => {
  
  const app: Application = express();

  middlewares(app);
  //Setup configuration Below
  useApiProxy(app, routes);
  useAuth(app, routes);
  //Setup configuration Over
  listen(app);
} 

const middlewares = ( app: Application ) => {
  app.use(helmet());
  app.use(cors(corsOptions));
}

const listen = ( app: Application ) => {

  const port = process.env.PORT || 3000;

  app.listen( port, () => console.log(`Gateway running on port ${port}`) )
}

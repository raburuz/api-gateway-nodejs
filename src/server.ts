/* EXPRESS */
import express, { Application } from "express"

/* APP */
import { apiProxy } from "./proxy";

const port = 3000; 

export const server = () => {
  
  const app: Application = express();

  proxies(app);
  //Setup configuration Below
  
  //Setup configuration Over
  listen(app);
}  

const proxies = ( app: Application ) => {
  app.use("/api", apiProxy );
}

const listen = ( app: Application ) => {

  app.listen( port, () => console.log(`Gateway running on port ${port}`) )
}

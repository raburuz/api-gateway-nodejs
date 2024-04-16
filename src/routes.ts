/* APP */
import { IRoute } from "./type";

export const routes: IRoute [] = [
  {
    url: "/auth",
    auth: true,
    proxy: {
      target: "https://deployed-service.com",
      changeOrigin: true,
      pathRewrite: {["^/auth"]: ""},
      on: {
        proxyRes: ( proxyResponse, req, res ) => {
          
          if( proxyResponse.statusCode === 200 ) {
            //Add JWT
            return res 
          }

        }
      } 
    }
  }
]

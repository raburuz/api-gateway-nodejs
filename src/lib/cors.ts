/* LIBRARIES */
import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: process.env.FRONTEND_DOMAIN_URL || "http://localhost:3000",
  credentials: true, 
}
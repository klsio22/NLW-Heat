import { Router } from "express";
import { AuthenticateUserController } from "./Controlllers/AuthenticateUserController";

const router = Router();

/* 
Não peciso usar os paremetros no metodo handle pois o express repassa esses parametros automaticamente 
 */

router.post("/authenticate", new AuthenticateUserController().handle);
export { router };

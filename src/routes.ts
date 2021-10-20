import { Router } from "express";
import { AuthenticateUserController } from "./Controllers/AuthenticateUserController";
import { CreateMessageController } from "./Controllers/CreateMassageController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

/* 
Não peciso usar os paremetros no metodo handle pois o express repassa esses parametros automaticamente 
 */

router.post("/authenticate", new AuthenticateUserController().handle);

router.post(
  "/messages",
  ensureAuthenticated,
  new CreateMessageController().handle
);

export { router };

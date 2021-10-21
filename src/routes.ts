import { Router } from "express";
import { AuthenticateUserController } from "./Controllers/AuthenticateUserController";
import { CreateMessageController } from "./Controllers/CreateMassageController";
import { GetLast3MessagesController } from "./Controllers/GetLastMenssagesController";
import { ProfileUserController } from "./Controllers/ProfileUserController";

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

router.get("/messages/last3", new GetLast3MessagesController().handle)

router.get("/profile", ensureAuthenticated, new ProfileUserController().handle);


export { router };

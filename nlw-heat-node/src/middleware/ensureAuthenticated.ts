import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Ipayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      errorCode: "token.invalid",
    });
  }

  //Bearer 9994464897fdsfdsf64h8ygtr98
  //[0] Bearer na posição 0
  //[1] 9994464897fdsfdsf64h8ygtr98 meu hash vai na posição 1

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as Ipayload;

    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).json({ erroCode: "token.expired" });
  }
}

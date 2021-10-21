import axios from "axios"; //importação via node
import prismaClient from "../prisma"; // Importação do client do DB
import { sign } from "jsonwebtoken";

/* 
  Receber code (string) (yes)
  Recuperar o access_tok no github (yes)
  Recuperar o info do usuário no github (yes)
  Verificar se o usario existe no DB (yes)
  ---- SIM = Gera um token (yes)
  ---- Não = cria no DB , gera um token (yes)
  retornar o token com as infos do usario (yes)

*/
//Criamos uma interface para conseguir ter acesso ao access_token
interface IAccessTokenResponse {
  access_token: string;
}

// Recuperar o info do usuário no github
interface IUserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";
    const { data: accessTokenResponse } =
      await axios.post<IAccessTokenResponse>(url, null, {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },

        headers: {
          Accept: "application/json",
        },
      });

    const response = await axios.get<IUserResponse>(
      "https://api.github.com/user",
      {
        headers: {
          authorization: `Bearer ${accessTokenResponse.access_token}`,
        },
      }
    );

    const { login, id, avatar_url, name } = response.data;
    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name,
        },
      });
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_ur: avatar_url,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return { token, user };
  }
}

export { AuthenticateUserService };

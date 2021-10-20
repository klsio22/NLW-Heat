import axios from "axios"; //importação via node

/* 
  Receber code (string)
  Recuperar o access_tok no github
  Veruficar se o usario existe no DB
  ---- SIM = Gera um token
  ---- Não = cria no DB , gera um token
  retornar o token com as infos do user

*/

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_tokken";
    const response = await axios.post(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },

      headers: {
        "Accept": "application/json",
      },
    });

    return response.data;

  }
}

export { AuthenticateUserService };

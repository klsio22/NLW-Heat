import axios from "axios"; //importação via node

/* 
  Receber code (string) (yes)
  Recuperar o access_tok no github (yes)
  Recuperar o info do usuário no github (yes)
  Verificar se o usario existe no DB
  ---- SIM = Gera um token
  ---- Não = cria no DB , gera um token
  retornar o token com as infos do user

*/
//Criamos uma interface para conseguir ter acesso ao access_token
interface IAccessTokenResponse {
  access_token: string
}

// Recuperar o info do usuário no github
interface IUserResponse{
  avatar_url:string;
  login: string,
  id:number,
  name:string
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";
    const {data:accessTokenResponse} = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },

    
      headers: {
        Accept: "application/json",
      },
    });

    const response = await axios.get<IUserResponse>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    })


    return response.data;
  }
}

export { AuthenticateUserService };

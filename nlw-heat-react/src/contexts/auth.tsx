import { createContext, ReactNode, useState } from "react";
import { useEffect } from "react";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

//seta dados dentro do contexto de autenticação do usuario
type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextData);

/* Recebe filho do tipo ReactNode , onde as informações do node são 
tranformadas em propriedade react*/
type AuthProvider = {
  children: ReactNode;
};

//Buscar uma resposta no banco de dados se usuario já está autenticado
type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

//“props” (que significa propriedades) com dados e retorna um elemento React

/* Conceitualmente, componentes são como funções JavaScript. Eles aceitam entradas arbitrárias (chamadas “props”) e retornam elementos React que descrevem o que deve aparecer na tela.
 */
export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?Scope=user&client_id=9fdef5059569958d1978`;

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>("authenticate", {
      code: githubCode,
    });
    
    const { token, user } = response.data;

    /* Mesmo que o usuario não dar refresh na pagina ele eviará o login junto com o 
    token de autenticação, para saber se o usuario está autenticado ou não */
    api.defaults.headers.common.authorization = `Bearer ${token}`;

    localStorage.setItem("@dowhile:token", token);
    //console.log(user);
    setUser(user);
  }

  //Delogar o usuario
  function signOut() {
    setUser(null);
    localStorage.removeItem("@dowhile:token");
  }

  //Buscar atenticação do usuario dentro do localStorage
  useEffect(() => {
    const token = localStorage.getItem("@dowhile:token");

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      api.get<User>("profile").then((response) => {
        // console.log(response.data);
        setUser(response.data);
      }); 
    }
  }, []);

  //Pegar o token do usario na url e verificar se o token já existe
  useEffect(() => {
    const url = window.location.href;
    const hasGithucode = url.includes("?code=");

    if (hasGithucode) {
      const [urlWithoutCode, githubCode] = url.split("?code=");

      //console.log({ urlWithoutCode, githubCode });
      window.history.pushState({}, "", urlWithoutCode);

      signIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}

import { useContext } from "react";
import { VscGithubInverted } from "react-icons/vsc";
import { useAuth } from "../../contexts/useAuth";
import styles from "./styles.module.scss";


export function LoginBox() {
  const {signInUrl} = useAuth()

  //console.log(user)
  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.singInWithGithub}>
        <VscGithubInverted size="24" />
        entrar com GitHub
      </a>
    </div>
  );
}

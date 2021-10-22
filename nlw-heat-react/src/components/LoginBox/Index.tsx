import { useEffect } from "react";
import { VscGithubInverted } from "react-icons/vsc";
import styles from "./styles.module.scss";

export function LoginBox() {
  const signInUrl = `https://github.com/login/oauth/authorize?Scope=user&client_id=9fdef5059569958d1978`;

  useEffect(() => {
    const url = window.location.href;
    const hasGithucode = url.includes("?code=");

    if (hasGithucode) {
      const [urlWithoutCode, githubCode] = url.split("?code=");

      //console.log({ urlWithoutCode, githubCode });
      window.history.pushState({}, '', urlWithoutCode);
    }

  }, []);

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

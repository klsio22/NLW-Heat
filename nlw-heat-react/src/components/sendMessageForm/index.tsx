import { FormEvent, useContext, useState } from "react";
import { VscSignOut, VscGithubInverted } from "react-icons/vsc";
import { AuthContext } from "../../contexts/auth";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

export function SendMessageForm() {
  const { user, signOut } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    await api.post("messages", { message });
    setMessage('');
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.singOutButton}>
        <VscSignOut size={32} />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          {/* "?." está fazendo uma verificação se o componete é nulo ou não  */}
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.username}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>

      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual sua espectativa para o evento"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        ></textarea>
        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  );
}

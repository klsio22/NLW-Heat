import styles from "./App.module.scss";
import { LoginBox } from "./components/LoginBox/Index";
import { MessageList } from "./components/MessageList";

export function App() {
  return (
    <main className={styles.contentWrapper}>
      <MessageList />
      <LoginBox />
    </main>
  );
}

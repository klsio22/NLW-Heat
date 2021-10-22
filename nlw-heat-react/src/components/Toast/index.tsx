import styles from "./styles.module.scss"

export function Toast(){
  return(
    <div className={styles.toastWrapper}>
      <div className={styles.userImage}>
        Message enviada com sucesso!
      </div>
    </div>
  )
}
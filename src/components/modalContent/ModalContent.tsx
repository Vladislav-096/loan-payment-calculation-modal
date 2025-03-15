import styles from "./modalContent.module.scss";

interface ModalContent {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalContent = ({ active, setActive }: ModalContent) => {
  const handleClose = () => {
    setActive(false);
  };

  return (
    <div
      className={active ? `${styles.content} ${styles.active}` : styles.content}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.close} onClick={handleClose}>
        <span className={`${styles.lines} ${styles.top}`}></span>
        <span className={`${styles.lines} ${styles.bottom}`}></span>
      </div>
    </div>
  );
};

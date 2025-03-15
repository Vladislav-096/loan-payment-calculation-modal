import { ReactNode } from "react";
import styles from "./popup.module.scss";

type PopUp = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};

export const PopUp = ({ active, setActive, children }: PopUp) => {
  return (
    <div
      // className={active ? "modal active" : "modal"}
      className={active ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={() => {
        setActive(false);
      }}
    >
      {children}
    </div>
  );
};

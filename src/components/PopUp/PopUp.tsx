import { ReactNode, useRef } from "react";
import styles from "./popup.module.scss";

type PopUp = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};

export const PopUp = ({ active, setActive, children }: PopUp) => {
  const clickStartedInsideRef = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    clickStartedInsideRef.current = e.target !== e.currentTarget;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!clickStartedInsideRef.current && e.target === e.currentTarget) {
      setActive(false);
    }
    clickStartedInsideRef.current = false;
  };

  return (
    <div
      className={active ? `${styles.modal} ${styles.active}` : styles.modal}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </div>
  );
};

import { useState } from "react";
import { PopUp } from "../PopUp/PopUp";
import styles from "./main.module.scss";
import { ModalContent } from "../ModalContent/ModalContent.tsx";

export const Main = () => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <main>
      <section>
        <div className="container">
          <button
            className={styles.culculation}
            onClick={() => setActive(true)}
          >
            Расчет платежей
          </button>
        </div>
      </section>
      <PopUp active={active} setActive={setActive}>
        <ModalContent active={active} setActive={setActive} />
      </PopUp>
    </main>
  );
};

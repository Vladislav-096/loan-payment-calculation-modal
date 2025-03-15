import { useState } from "react";
import styles from "./modalContent.module.scss";
import { Calculations } from "../Calculations/Calculations";

interface ModalContent {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalContent = ({ active, setActive }: ModalContent) => {
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const handleClose = () => {
    setActive(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setIsEmpty(false);

    if (/^\d*\.?\d*$/.test(value)) {
      setInputValue(Number(value));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue) {
      setIsEmpty(true);
    } else {
      setAmount(inputValue);
    }
  };

  return (
    <div
      className={active ? `${styles.content} ${styles.active}` : styles.content}
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className={styles.heading}>Платежи по кредиту</h1>
      <p className={styles.descr}>
        Введите сумму кредита и выберите срок, на который вы хотите его
        оформить. Мы автоматически рассчитаем для вас ежемесячный платеж, чтобы
        вы могли лучше спланировать свои финансы.
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ваша сумма кредита</label>
          <input
            type="text"
            value={inputValue ? inputValue : ""}
            onChange={handleChange}
            className={`${isEmpty ? styles.error : ""}`}
          />
        </div>
        <button type="submit">Расчитать</button>
      </form>
      <div className={styles.close} onClick={handleClose}>
        <span className={`${styles.lines} ${styles.top}`}></span>
        <span className={`${styles.lines} ${styles.bottom}`}></span>
      </div>
      <Calculations amount={amount} />
    </div>
  );
};

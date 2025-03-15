import { useEffect, useState } from "react";
import styles from "./calculations.module.scss";

interface Calculations {
  amount: number | null;
}

interface months {
  months: number;
}

type calculationOption = "month" | "year";

const months: number[] = [12, 24, 36, 48];

export const Calculations = ({ amount }: Calculations) => {
  const [monthDevisor, setMonthDevisor] = useState<number>(12);
  const [calculationOption, setCalculationOption] =
    useState<calculationOption>("month");
  const [modifiedAmount, setModifiedAmount] = useState<null | number>(null);

  const handleMonthClick = ({ months }: months) => {
    setMonthDevisor(months);
  };

  const handlePerYearClick = () => {
    setCalculationOption("year");
  };

  const handlePerMonthClick = () => {
    setCalculationOption("month");
  };

  const handleAddClick = () => {
    console.log("добавил");
  };

  useEffect(() => {
    if (amount) {
      let option = 1;

      if (calculationOption === "year") {
        option = 12;
      }

      const newAmount = amount / (monthDevisor / option);
      setModifiedAmount(newAmount);
    }
  }, [amount, monthDevisor, calculationOption]);

  return (
    <>
      <div className={styles["month-count"]}>
        <h2 className={styles["month-count-heading"]}>Количество месяцев?</h2>
        <>
          {months.map((item, index) => (
            <button
              key={index}
              className={`${styles.month} ${
                monthDevisor === item ? styles.chosen : ""
              }`}
              onClick={() => handleMonthClick({ months: item })}
            >
              {item}
            </button>
          ))}
        </>
      </div>
      <div className={styles["format-wrapper"]}>
        <h2 className={styles.payment}>Итого ваш платеж по кредиту:</h2>
        <div className={styles.formats}>
          <button
            className={`${styles.option} ${
              calculationOption === "year" ? styles.chosen : ""
            }`}
            onClick={handlePerYearClick}
          >
            в год
          </button>
          <button
            className={`${styles.option} ${
              calculationOption === "month" ? styles.chosen : ""
            }`}
            onClick={handlePerMonthClick}
          >
            в месяц
          </button>
        </div>
      </div>
      {modifiedAmount !== null && (
        <p className={styles.result}>
          {new Intl.NumberFormat("ru-RU", {
            minimumFractionDigits: modifiedAmount % 1 !== 0 ? 2 : 0,
            maximumFractionDigits: 2,
          }).format(modifiedAmount)}{" "}
          рублей
        </p>
      )}
      <button className={styles.add} onClick={handleAddClick}>
        Добавить
      </button>
    </>
  );
};

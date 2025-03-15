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
    <div>
      <div>
        <h2>Количество месяцев</h2>
        {months.map((item, index) => (
          <button
            key={index}
            className={styles.months}
            onClick={() => handleMonthClick({ months: item })}
          > 
            {item}
          </button>
        ))}
      </div>
      <div>
        <button style={{ marginRight: "15px" }} onClick={handlePerYearClick}>
          в год
        </button>
        <button onClick={handlePerMonthClick}>в месяц</button>
      </div>
      <div>{amount && <span>{modifiedAmount}</span>}</div>
    </div>
  );
};

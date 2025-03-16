interface CurrencyHelpersProps {
  locale?: string;
  maximumFractionDigits?: number;
  currency?: string;
}

export const useCurrencyHelpers = ({
  locale = "bg-BG",
  maximumFractionDigits = 2,
  currency = "EUR",
}: CurrencyHelpersProps = {}) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits,
  });

  const toParts = formatter.formatToParts(4);
  const currencySymbol =
    toParts.find(({ type }) => type === "currency")?.value ?? "";
  const thousandSeparator =
    formatter.formatToParts(11111111).find(({ type }) => type === "group")
      ?.value ?? "";
  const decimalSeparator =
    formatter.formatToParts(1.1).find(({ type }) => type === "decimal")
      ?.value ?? ".";
  const literalSeparator =
    formatter.formatToParts(1.1).find(({ type }) => type === "literal")
      ?.value ?? "";

  const parseToNumberBeforeSubmit = (stringNumber: string | number): number => {
    if (typeof stringNumber === "number") {
      return stringNumber;
    }

    if (!stringNumber || stringNumber.trim() === "") {
      return 0;
    }

    return parseFloat(
      stringNumber
        .replace(currencySymbol, "")
        .replace(literalSeparator, "")
        .replace(new RegExp(`\\${thousandSeparator}`, "g"), "")
        .replace(new RegExp(`\\${decimalSeparator}`), ".")
    );
  };

  const trimExceedingDecimals = (inputString: string): string => {
    const [integer, decimals = ""] = inputString.split(decimalSeparator);
    const trimmedDecimals = decimals.slice(0, maximumFractionDigits);
    return [integer, trimmedDecimals].join(decimalSeparator);
  };

  const sanitizeInput = (input: string | number): string => {
    let cleaned = "";
    let hasDecimalSeparator = false;

    String(input)
      .split("")
      .forEach((letter) => {
        //allowing only one separator
        if (letter === decimalSeparator && !hasDecimalSeparator) {
          cleaned += letter;
          hasDecimalSeparator = true;
          return;
        }

        if ("0123456789".includes(letter)) {
          cleaned += letter;
        }
      });

    if (hasDecimalSeparator) {
      return trimExceedingDecimals(cleaned);
    }

    return cleaned;
  };

  const normalizeToMaxLength = (inputString: string): string => {
    const sanitized = sanitizeInput(inputString);
    const trimmedExceedingDecimals = trimExceedingDecimals(sanitized);
    return trimmedExceedingDecimals.endsWith(decimalSeparator)
      ? trimmedExceedingDecimals.slice(0, -1)
      : trimmedExceedingDecimals;
  };

  const parseToCleanString = (value: string | number | undefined): string => {
    if (value === formatter.format(0)) {
      return "";
    }

    if (typeof value === "number") {
      return String(value).replace(".", decimalSeparator);
    }

    if (!value || value.trim() === "") {
      return "";
    }

    if (value === currencySymbol) {
      return "";
    }

    if (typeof value === "undefined") {
      return "";
    }

    return normalizeToMaxLength(value);
  };

  const format = (value: string | number): string => {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      return formatter.format(0);
    }

    const normalizedToMaxLength = normalizeToMaxLength(String(value));
    return formatter.format(parseToNumberBeforeSubmit(normalizedToMaxLength));
  };

  return {
    parseToCleanString,
    format,
    formatter,
    sanitizeInput,
    parseToNumberBeforeSubmit,
  };
};

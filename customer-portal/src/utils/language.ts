import { useIntl } from "react-intl";

export const useTranslate = () => {
  const intl = useIntl();

  const translate = (
    id: string,
    defaultMessage?: string,
    params?: { [k: string]: string }
  ) => {
    const message = intl.formatMessage(
      {
        id,
        defaultMessage: defaultMessage || "",
      },
      { ...params }
    );
    return message;
  };

  return translate;
};

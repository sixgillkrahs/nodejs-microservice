import { useIntl } from "react-intl";

export const useTranslate = () => {
  const intl = useIntl();

  const translate = (id: string, defaultMessage?: string, params?: any) => {
    return intl.formatMessage(
      {
        id,
        defaultMessage: defaultMessage || "",
      },
      { ...params }
    );
  };

  return translate;
};

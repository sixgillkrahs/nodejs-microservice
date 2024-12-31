import { lang } from "../interfaces/baseEvent";
import _ from "lodash";

export const getLanguege = () => {
  const lang = localStorage.getItem("lang");
  return lang === "en" ? "en" : "vi";
};

export const renderLang = (value: string | lang) => {
  return _.isObject(value)
    ? getLanguege() === "en"
      ? value.en
      : value.vi
    : value;
};

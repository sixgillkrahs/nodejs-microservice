import querystring from "query-string";
import { STORAGE_KEY } from "../constants";
import { RespLogin } from "../interfaces/base";

export const getPageQuery = () =>
  querystring.parse(window.location.href.split("?")[1]);

export const getCurrentAddress = () => {
  const data: RespLogin = JSON.parse(
    localStorage.getItem(STORAGE_KEY || "APP_TOKEN") || ""
  );

  return data.profile.address?.join(" - ");
};

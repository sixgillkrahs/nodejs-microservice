import { LoginObj } from "../../interfaces/login";
import { fetch } from "../../utils";
import { RegisterObj } from "../../interfaces/register";

const login = async (body: LoginObj) => {
  try {
    const resp = await fetch.post("/auth/signin", body);
    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const register = async (body: RegisterObj) => {
  try {
    const resp = await fetch.post("/auth/register", body);
    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export { login, register };

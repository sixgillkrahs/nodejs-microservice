import axios from "axios";
import { LoginObj } from "../../interfaces/login";
import { fetch } from "../../utils";

const login = async (body: LoginObj) => {
  try {
    const resp = await fetch.post("/auth/signin", body);
    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export { login };

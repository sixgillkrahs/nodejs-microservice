import Register from "./register";
import Signin from "./sigin";

const ActionRegister = new Register().getAction();
const ActionSignin = new Signin().getAction();

export { ActionRegister, ActionSignin };

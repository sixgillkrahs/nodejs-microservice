import { MainProcess } from "../data-transfers";

const jwt = require("jsonwebtoken");

class BaseLogic {
  constructor(mainProcess: MainProcess) {}
  createToken(profile, period, key) {
    return jwt.sign(
      {
        exp: period,
        data: profile,
      },
      key
    );
  }

  formatDate(date, hour, minute, second) {
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let year = date.getFullYear();
    console.log(month, day);
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return (
      [year, month, day].join("-") + `T${hour}:${minute}:${second}.000+07:00`
    );
  }
}

export { BaseLogic };

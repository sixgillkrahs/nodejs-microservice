import _ from "lodash";

const isValid = (str: any) => (
  !_.isNull(str)
  || !_.isEmpty(str)
  || !_.isUndefined(str)
);

export const currency = (number: any) => {
  if (!isValid(number) || typeof number !== "number") {
    return number;
  }
    const p = number.toFixed(2).split(".");
    const convert= p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return num + (num != "-" && i && !(i % 3) ? "." : "") + acc;
    }, "") + "," + p[1];
    if (convert.match(/\,/)) {
     return convert.replace(/\,?0+$/, "");
    }
  return convert;
};

import _ from "lodash";
import {Context, Errors} from "moleculer";

/** Check parameter of requests must be correct data set
 * for a user current action or user have role with full permission */
export function validationParameterMiddleware(ctx: Context<any, {user: any}>) {
  const checkParam = ctx.action.checkParam;
  if (!checkParam) {
    return ctx;
  }
  if (checkParam.userTypeByPass.includes(ctx.meta.user.userType)) {
    return ctx;
  }
  const checkFields = checkParam.params;
  if (!checkFields || checkFields.length < 1) {
    return ctx;
  }
  const params = ctx.params;
  checkFields.map(field => {
    const param = params[field.key];
    if (field.require === true && !param) {
      throw new Errors.MoleculerError("BAD_REQUEST", 400, "BAD_REQUEST");
    }
    let valueCheck = null;
    if (field.dataType === "object") {
      valueCheck = _.get(ctx, field.checkAt)[field.fieldCheck];
      if (param && param !== valueCheck) {
        throw new Errors.MoleculerError("BAD_REQUEST", 400, "BAD_REQUEST");
      }
    }
    if (field.dataType === "array") {
      const listDataCheck = _.get(ctx, field.checkAt);
      if (!listDataCheck || listDataCheck.length < 1) {
        throw new Errors.MoleculerError("BAD_REQUEST", 400, "BAD_REQUEST");
      }
      valueCheck = _.get(ctx, field.checkAt).map(x => x[field.fieldCheck]);
      if (param && !valueCheck.includes(param)) {
        throw new Errors.MoleculerError("BAD_REQUEST", 400, "BAD_REQUEST");
      }
    }
    if (field.isCreateOfNull === true) {
      params[field.key] = valueCheck;
    }
    return field;
  });
  return ctx;
}

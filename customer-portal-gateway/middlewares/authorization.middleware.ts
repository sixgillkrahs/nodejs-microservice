import {Context, Errors} from "moleculer";
import {INTERNAL_CODES, STATE} from "goopay-library/defined/state-code";
import {SVC_ENV} from "../svc-env";


export async function authorizationMiddleware(ctx: Context | any) {
  if (!ctx || !ctx.action) {
    throw new Errors.MoleculerError("Processing failed", 505, "ERR_PROCESS");
  }
  if (ctx.action.authorization === true) {
    let resp = {code: 0, data: {}, message: ""};
    ctx.meta.rest = ctx.action.rest;
    resp = await ctx.call(`${SVC_ENV.get().AUTH_SERVICE}.authorize`, ctx.params, {meta: ctx.meta});
    const { code, data, message } = resp;
    if (code !== INTERNAL_CODES.SUCCESS.CODE) {
      throw new Errors.MoleculerError(message || "ERR_AUTH", 403, "ERR_AUTH");
    }
    return ctx;
  }
  return ctx;
}

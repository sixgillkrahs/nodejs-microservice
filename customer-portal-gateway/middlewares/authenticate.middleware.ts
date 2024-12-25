import { Context, Errors } from "moleculer";
import { INTERNAL_CODES } from "goopay-library/defined/state-code";
import {SVC_ENV} from "../svc-env";


export async function authenticateMiddleware(ctx: Context<any, { user: any }>) {
	if (!ctx || !ctx.action) {
		throw new Errors.MoleculerError("Processing failed", 505, "ERR_PROCESS");
	}
	if (ctx.action.authenticate === true) {
		let resp = { code: 0, data: {}, message: "" };
		resp = await ctx.call(`${SVC_ENV.get().AUTH_SERVICE}.authenticate`, ctx.params, { meta: ctx.meta });
		const { code, data, message } = resp;
		if (code !== INTERNAL_CODES.SUCCESS.CODE) {
			throw new Errors.MoleculerError("ERR_AUTH", 401, "ERR_AUTH");
		}
		ctx.meta.user = data;
	}
	return ctx;
}

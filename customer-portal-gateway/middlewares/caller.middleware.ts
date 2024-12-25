import {Context, Errors} from "moleculer";
import {SVC_ENV} from "../svc-env";


export function callerMiddleware(ctx: Context) {
	if (ctx.caller !== SVC_ENV.get().SERVICE_NAME) {
		throw new Errors.MoleculerError("ERR_REQ", 514, "ERR_REQ");
	}
	return ctx;
}

import { Context } from "moleculer";
import IAction from "../../IAction";
import { SVC_ENV } from "../../../svc-env";

class Register implements IAction {
	public readonly setting: object = {
		authenticate: false,
		authorization: false,
	};
	public readonly handlerObj = {
		async handler(ctx: Context) {
			const resp = await ctx.call(
				`${SVC_ENV.get().AUTH_SERVICE}.register`,
				ctx.params,
				{ meta: ctx.meta }
			);
			return resp;
		},
	};
	public getAction(): any {
		return Object.assign(this.setting, this.handlerObj);
	}
}

export = Register;

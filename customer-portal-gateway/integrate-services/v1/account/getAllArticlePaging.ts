import { Context } from "moleculer";
import IAction from "../../IAction";
import { SVC_ENV } from "../../../svc-env";

class GetAllArticlePaging implements IAction {
	public readonly setting: object = {
		authenticate: false,
		authorization: false,
		langFields: ["title", "content", "contentAction.data.buttonName"],
	};
	public readonly handlerObj = {
		async handler(ctx: Context) {
			const resp = await ctx.call(
				`${SVC_ENV.get().ACCOUNT_SERVICE}.getAllAccount`,
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

export = GetAllArticlePaging;

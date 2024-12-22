import { Context } from "moleculer";

interface IAction {
	setting: object;
	handlerObj: {
		handler(ctx: Context): any;
	};
	getAction(): any;
}

export = IAction;

import {IncomingMessage, ServerResponse} from "http";
import {RequestHelper, ResponseHelper} from "goopay-library/helpers";
import BaseRouting from "./base.routing";
import ISecurity from "./ISecurity";

class RoutingSecurity extends BaseRouting implements ISecurity {
	/** VALIDATION REQUEST
	 * @param req
	 * @param res
	 */
	public validRequest(req: IncomingMessage, res: ServerResponse): void {
		this.checkAllowMethod(req, res);
		this.checkNoSqlInjection(req, res);
		this.checkHtmlInjection(req, res);
		this.checkSqlInjection(req, res);
	}
	/** VALIDATION ACCESS RULES
	 * @param req
	 * @param res
	 */
	public validAccessRules(req: IncomingMessage, res: ServerResponse): void {
		/** PUT ALL ACTION USE CHECK RULE AT HERE */
	}
}
export = RoutingSecurity;

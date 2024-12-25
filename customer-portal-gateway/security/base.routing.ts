import { IncomingMessage, ServerResponse } from "http";
import { RequestHelper, ResponseHelper } from "goopay-library/helpers";

class BaseRouting {
	protected checkAllowMethod(req, res): void {
		const allowMethods = ["GET", "POST", "PUT", "DELETE"];
		const { method } = req;
		if (!allowMethods.includes(method)) {
			res.statusCode = 405;
			res.setHeader("Content-Type", "application/json; charset=utf-8");
			res.end(
				JSON.stringify({
					code: 405,
					message: "Method not allowed",
				})
			);
		}
	}
	protected checkNoSqlInjection(req, res): void {
		/** Check valid params input */
		const paramCheck = RequestHelper.sanitizeParam(req);
		if (!paramCheck) {
			/** Not valid throw error 400 Bad request */
			res.statusCode = 400;
			res.end(
				JSON.stringify({
					code: 400,
					message: "Bad request",
				})
			);
		}
	}
	protected checkSqlInjection(req, res): void {
		return;
	}
	protected checkHtmlInjection(req, res): void {
		return;
	}
	protected whiteListIP(): void {
		return;
	}
	protected rateLimit(): void {
		return;
	}
}

export = BaseRouting;

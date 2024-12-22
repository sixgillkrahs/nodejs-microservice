import { LoggerHelper } from "goopay-library/helpers";
import { BaseTracking } from "./base.tracking";

class RoutingTracking extends BaseTracking {
	/** TRACKING */
	public trackingRequest(ctx, route, req, res, logger) {
		try {
			const reqObj = {
				type: "REQ",
				nodeId: ctx.nodeID,
				requestId: ctx.id,
				correlationId: ctx.meta.correlationId,
				requestTime: ctx.meta.requestTime,
				url: req.originalUrl,
				method: req.method,
				headers: req.headers,
				clientIP: ctx.meta.clientIP,
				prototype: ctx.meta.prototype,
				action: req && req.$action ? req.$action.name : "",
				params: req && req.$params ? req.$params : {},
				ignoreFields: super.getIgnoreField().ignoreFields,
				userName:
					ctx.meta.user && ctx.meta.user.userName ? ctx.meta.user.userName : "GUEST",
			};
			/** Log req */
			const logAC = LoggerHelper.getFormatLogGwAC(reqObj);
			logger.info(logAC);
		} catch (e) {
			logger.error(e);
		}
	}
	public trackingResponse(ctx, route, req, res, data, logger) {
		try {
			const resObj = {
				type: "RES",
				nodeId: ctx.nodeID,
				requestId: ctx.id,
				correlationId: ctx.meta.correlationId,
				requestTime: ctx.meta.requestTime,
				url: req.originalUrl,
				method: req.method,
				headers: req.headers,
				clientIP: ctx.meta.clientIP,
				prototype: ctx.meta.prototype,
				action: req && req.$action ? req.$action.name : "",
				params: req && req.$params ? req.$params : {},
				ignoreFields: super.getIgnoreField().ignoreFields,
				userName:
					ctx.meta.user && ctx.meta.user.userName ? ctx.meta.user.userName : "GUEST",
				data,
			};
			/** Log res */
			const logOutput = LoggerHelper.getFormatLogGwOUT(resObj);
			logger.info(logOutput);
			/** Return */
			return data;
		} catch (e) {
			logger.error(e);
		}
	}
}

export = RoutingTracking;

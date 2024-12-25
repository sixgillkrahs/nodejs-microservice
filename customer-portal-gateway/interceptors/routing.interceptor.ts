import _ from "lodash";
import Moleculer, { LoggerInstance, ServiceBroker } from "moleculer";
import { ResponseHelper } from "goopay-library/helpers";
import { RoutingSecurity } from "../security";
import {RoutingTracking} from "../tracking";
import MoleculerError = Moleculer.Errors.MoleculerError;

class RoutingInterceptor {
	private readonly broker: ServiceBroker;
	private readonly logger: LoggerInstance;
	private readonly routingSecurity: RoutingSecurity = new RoutingSecurity();
	private readonly tracking: RoutingTracking = new RoutingTracking();
	public constructor(broker: ServiceBroker) {
		this.broker = broker;
		this.logger = this.broker.logger;
	}

	/** BASE FUNCTIONS PRE-PROCESS REQUEST
	 * THIS IS CAN OVERWRITE FROM CHILD SERVICES
	 */
	public onBeforeCallBase(ctx, route, req, res) {
		/** Set header again to context meta */
		ctx.meta.headers = req.headers;
		ctx.meta.userAgent = req.headers["user-agent"];
		ctx.meta.clientIP =
			req.headers["x-forwarded-for"] ||
			req.connection.remoteAddress ||
			req.socket.remoteAddress ||
			req.connection.socket.remoteAddress;
		ctx.meta.correlationId = ctx.id;
		ctx.meta.requestTime = new Date(Date.now()).toISOString();
		ctx.meta.prototype = "REST";
		/** Validation request */
		this.routingSecurity.validRequest(req, res);
		/** Tracking request */
		this.tracking.trackingRequest(ctx, route, req, res, this.logger);
	}
	/** BASE FUNCTIONS PRE-PROCESS RESPONSE
	 * THIS IS CAN OVERWRITE FROM CHILD SERVICES
	 */
	public onAfterCallBase(ctx, route, req, res, data) {
		/** Processing correct format response: { code, data, message } */
		const response = ResponseHelper.resGateway(data, res);
		/** Tracking response */
		this.tracking.trackingResponse(
			ctx,
			route,
			req,
			res,
			response,
			this.logger
		);
		return response;
	}

	/** BASE FUNCTIONS HANDLE ERRORS FOR EACH ROUTE
	 * THIS IS CAN OVERWRITE FROM CHILD SERVICES
	 */
	public onErrorBase(req, res, err) {
		if ([400, 404].includes(err.code)) {
			this.logger.warn(`ROUTE_ERROR: ${req.originalUrl} message: ${err.message}`);
		} else if ([401, 403].includes(err.code)) {
			this.logger.warn(`AUTH_ERROR: ${req.originalUrl} message: ${err.message}`);
		} else {
			this.logger.error(err);
		}

		res.setHeader("Content-Type", "application/json; charset=utf-8");
		if (err && _.isObject(err.message)) {
			res.statusCode = err.message.code;
			res.end(JSON.stringify({code: err.message.code }));
		} else {
			res.statusCode = err.code || 501;
			res.end(JSON.stringify({
				code: err.code || 501,
				message: err.type || "SYS_ERR" // Error type is moleculer error object: SERVICE_NOT_AVAILABLE || REQUEST_TIME_OUT ...
			}));
		}
	}
}

export = RoutingInterceptor;

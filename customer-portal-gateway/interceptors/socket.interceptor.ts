import Moleculer, { Context, Service } from "moleculer";
import { Socket } from "socket.io";
import { redis } from "../caching";
import { IResponseService } from "../data-transfer/IResponseService";
import { ISocketEventSetting } from "../data-transfer/ISocketEventSetting";
import { ROOM } from "../defined/app-setting";
import { ValidationException } from "../exceptions";
import { SVC_ENV } from "../svc-env";
import { SocketTracking } from "../tracking";
import MoleculerError = Moleculer.Errors.MoleculerError;

class SocketInterceptor {
	private static tracking: SocketTracking = new SocketTracking();
	public static verifyToken(socket: Socket, params: any, service: Service): Promise<any> {
		return new Promise((res, rej) => {
			const authFunc = `${SVC_ENV.get().AUTH_SERVICE}.authenticate`;
			const contextFact: Context<IResponseService, any> = new Context(service.broker, null);
			contextFact.meta.headers = params.headers;
			contextFact.call<IResponseService, any>(authFunc, {}, {meta: contextFact.meta})
				.then(resp => {
					const { code, data } = resp;
					if (code === 1) {
						return res(data);
					}
					if (code === 1008) {
						return rej(new MoleculerError("TOKEN_EXPIRED", 401, "TOKEN_EXPIRED"));
					}
					return rej(new MoleculerError("ERR_AUTH", 401, "ERR_AUTH"));
				})
				.catch(err => rej(err));
		});
	}
	public static processRequest(socket: Socket, eventSetting: ISocketEventSetting, params: any, service: Service): Promise<Context> {
		return new Promise((res, rej) => {
			/** Process and return to a moleculer context */
			const contextFact: Context<any, any> = new Context(service.broker, null);
			/** Set context input req - Set client ip called request to context ==> other service can get client ip from context */
			contextFact.meta.clientIP = socket.handshake.address || "unknown";
			contextFact.params = params.body;
			contextFact.meta.headers = params.headers;
			contextFact.meta.event = eventSetting;
			contextFact.meta.correlationId = contextFact.id;
			contextFact.meta.requestTime = new Date(Date.now()).toISOString();
			contextFact.meta.prototype = "SOCKET";
			contextFact.meta.method = params.headers.method;
			/** Set socket handshake input req - Set req id to socket handshake ==> can tracking request id again when contextFact was already disposed */
			socket.handshake.headers.reqId = contextFact.id;
			socket.handshake.headers.correlationId = contextFact.id;
			socket.handshake.headers.requestTime = contextFact.meta.requestTime;
			socket.handshake.headers.prototype = contextFact.meta.prototype;
			socket.handshake.headers.method = params.headers.method;
			/** Log the request */
			this.tracking.trackingRequest(socket, params, service, eventSetting, contextFact);
			/** Valid request method */
			if (!params.headers || !params.headers.method || params.headers.method !== eventSetting.method) {
				throw new MoleculerError("BAD_REQ", 400, "BAD_REQ");
			}
			/** Verify token */
			this.verifyToken(socket, params, service)
				.then(customerObj => {
					/** Set headers and params to context */
					contextFact.meta.email = customerObj.email;
					contextFact.meta.user = customerObj.user;
					/** Overwrite headers socket */
					socket.handshake.auth.email = customerObj.email;
					socket.handshake.auth.sid = socket.id;
					socket.handshake.auth.userName = customerObj.email;
					/** Saving to redis db */
					redis
						.sSave(
							ROOM.CLIENT_CONNECTING,
							{
								sid: socket.id,
								email: socket.handshake.auth.email,
								room: ROOM.CLIENT_CONNECTING
							}
						).catch(err => err);
					redis
						.set(
							socket.handshake.auth.email,
							socket.id
						).catch(err => err);
					return res(contextFact);
				})
				.catch(err => rej(err));
		});
	}
	public static processResponse(socket: Socket, result: any, service: Service,
																eventSetting: ISocketEventSetting = {} as ISocketEventSetting): object {
		const response = {
			code: result.code,
			data: result.data,
			message: result.message
		};
		/** Log the response */
		this.tracking.trackingResponse(socket, result, service, eventSetting);
		return response;
	}
	public static processError(socket: Socket, err: MoleculerError | ValidationException, service: Service,
														 eventSetting: ISocketEventSetting = {} as ISocketEventSetting) {
		const response = {
			code: err.code || 501,
			message: err.type || "SYS_ERR" // Error type is moleculer error object: SERVICE_NOT_AVAILABLE || REQUEST_TIME_OUT ...
		};
		/** Log the response */
		service.logger.error(err);
		this.tracking.trackingResponse(socket, response, service, eventSetting);
		return response;
	}
}

export = SocketInterceptor;

import {Socket} from "socket.io";
import {Context, Service} from "moleculer";
import {LoggerHelper} from "goopay-library/helpers";
import {ISocketEventSetting} from "../data-transfer/ISocketEventSetting";
import {BaseTracking} from "./base.tracking";

class SocketTracking extends BaseTracking {
	public trackingRequest(socket: Socket, params: any, service: Service, eventSetting: ISocketEventSetting, ctx: Context<any, any>) {
		try {
			const request = socket.request;
			const reqObj = {
				nodeId: service.broker.nodeID,
				requestId: ctx.id,
				url: request.url,
				headers: request.headers,
				clientIP: socket.handshake.address,
				action: eventSetting.name,
				method: params.headers.method,
				correlationId: socket.handshake.headers.reqId,
				requestTime: socket.handshake.headers.requestTime,
				prototype: socket.handshake.headers.prototype,
				ignoreFields: this.getIgnoreField().ignoreFields,
				userName: socket.handshake.auth && socket.handshake.auth.userName ? socket.handshake.auth.userName : "GUEST",
				params: params.body
			};
			/** Log req */
			const logAC = LoggerHelper.getFormatLogGwAC(reqObj);
			service.logger.info(logAC);
		} catch (e) {
			service.logger.error(e);
		}
	}

	public trackingResponse(socket: Socket, result: any, service: Service, eventSetting: ISocketEventSetting) {
		try {
			const request = socket.request;
			const resObj = {
				nodeId: service.broker.nodeID,
				requestId: socket.handshake.headers.reqId,
				url: request.url,
				headers: request.headers,
				clientIP: socket.handshake.address,
				action: eventSetting.name,
				method: socket.handshake.headers.method,
				correlationId: socket.handshake.headers.reqId,
				requestTime: socket.handshake.headers.requestTime,
				prototype: socket.handshake.headers.prototype,
				ignoreFields: this.getIgnoreField().ignoreFields,
				userName: socket.handshake.auth && socket.handshake.auth.userName ? socket.handshake.auth.userName : "GUEST",
				data: result
			};
			const logOutput = LoggerHelper.getFormatLogGwOUT(resObj);
			service.logger.info(logOutput);
		} catch (e) {
			service.logger.error(e);
		}
	}

	public trackingError(socket: Socket, error: any, service: Service, eventSetting: ISocketEventSetting) {
		const request = socket.request;
		const responseTrack = {
			nodeId: service.broker.nodeID,
			requestId: socket.handshake.headers.reqId,
			url: request.url,
			headers: request.headers,
			clientIP: socket.handshake.address,
			method: request.headers.method,
			error
		};
		service.logger.error(responseTrack);
	}
}

export = SocketTracking;

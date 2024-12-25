import { Service } from "moleculer";
import { Socket } from "socket.io";
import { IParamService } from "../data-transfer/IParamService";
import { IResponseService } from "../data-transfer/IResponseService";
import { ISocketEventSetting } from "../data-transfer/ISocketEventSetting";
import { SocketInterceptor } from "../interceptors";
import { getListNotice } from "./event-handlers";

export function socketEventHandle(socket: Socket, service: Service) {
	/** Listen on events: events defined at here as event login */
	getListNotice(socket, service);
}
export const eventProcess = (
	socket: Socket,
	setting: ISocketEventSetting,
	service: Service,
	options?: { cbResolve?: Function; cbReject?: Function; validator?: Function }
): void => {
	socket.on(setting.name, (params) => {
		/** Processing request */
		SocketInterceptor.processRequest(socket, setting, params, service)
			.then((contextFact) => {
				if (options?.validator) {
					options.validator(contextFact, params);
				}
				return contextFact.call<IResponseService, IParamService>(
					setting.serviceAction,
					contextFact.params as IParamService,
					{ meta: contextFact.meta }
				);
			})
			.then((res) => {
				if (options?.cbResolve) {
					options.cbResolve();
				} else {
					socket.emit(
						setting.name,
						SocketInterceptor.processResponse(socket, res, service, setting)
					);
				}
			})
			.catch((err) => {
				service.broker.logger.error(err);
				if (options?.cbReject) {
					options.cbReject(err);
				} else {
					socket.emit(
						setting.name,
						SocketInterceptor.processError(socket, err, service, setting)
					);
				}
			});
	});
};

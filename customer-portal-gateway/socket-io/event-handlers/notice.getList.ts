import {Socket} from "socket.io";
import {Service} from "moleculer";
import {SocketInterceptor} from "../../interceptors";
import {ISocketEventSetting} from "../../data-transfer/ISocketEventSetting";
import {IResponseService} from "../../data-transfer/IResponseService";
import {IParamService} from "../../data-transfer/IParamService";
import {SVC_ENV} from "../../svc-env";

export function getListNotice(socket: Socket, service: Service) {
	const getListNoticeEventSetting = {
		name: "getListNotice",
		method: "GET",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.getListNotification`
	} as ISocketEventSetting;

	const logger = service.broker.logger;
	try {
		socket.on(getListNoticeEventSetting.name, params => {
			/** Processing request */
			SocketInterceptor.processRequest(socket, getListNoticeEventSetting, params, service)
				.then(contextFact => contextFact.call<IResponseService, IParamService>(
					getListNoticeEventSetting.serviceAction, contextFact.params as IParamService, {meta: contextFact.meta}))
				.then(res => {
					socket.emit(getListNoticeEventSetting.name, SocketInterceptor.processResponse(socket, res, service, getListNoticeEventSetting));
				})
				.catch(err => {
					socket.emit(getListNoticeEventSetting.name, SocketInterceptor.processError(socket, err, service, getListNoticeEventSetting));
				});
		});
	} catch (err) {
		logger.error(err);
		socket.emit(getListNoticeEventSetting.name, SocketInterceptor.processError(socket, err, service, getListNoticeEventSetting));
	}
}

import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function getOrderListPagingEvent(socket: Socket, service: Service) {
	const getOrderListPagingEvent = {
		name: "getOrderListPaging",
		method: "GET",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.getOrderListPaging`
	} as ISocketEventSetting;

	eventProcess(socket, getOrderListPagingEvent, service);
}


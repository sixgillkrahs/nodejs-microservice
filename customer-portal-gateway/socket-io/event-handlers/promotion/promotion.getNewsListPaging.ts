import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function getNewsListPagingEvent(socket: Socket, service: Service) {
	const getNewsListPagingEvent = {
		name: "getNewsListPaging",
		method: "GET",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.getNewsListPaging`
	} as ISocketEventSetting;

	eventProcess(socket, getNewsListPagingEvent, service);
}


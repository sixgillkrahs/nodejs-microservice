import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function getOrderReportListPagingEvent(socket: Socket, service: Service) {
	const getOrderReportListPagingEvent = {
		name: "getOrderReportListPaging",
		method: "GET",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.getOrderReportListPaging`
	} as ISocketEventSetting;

	eventProcess(socket, getOrderReportListPagingEvent, service);
}


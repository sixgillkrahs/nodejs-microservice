import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function exportOrderReportListEvent(socket: Socket, service: Service) {
	const exportOrderReportListEvent = {
		name: "exportOrderReportList",
		method: "GET",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.exportOrderReportList`
	} as ISocketEventSetting;

	eventProcess(socket, exportOrderReportListEvent, service);
}


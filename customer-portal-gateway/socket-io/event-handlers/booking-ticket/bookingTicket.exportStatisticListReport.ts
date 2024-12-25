import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function exportStatisticListReportEvent(socket: Socket, service: Service) {
	const exportStatisticListReportEvent = {
		name: "exportStatisticListReport",
		method: "GET",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.exportStatisticListReport`
	} as ISocketEventSetting;

	eventProcess(socket, exportStatisticListReportEvent, service);
}


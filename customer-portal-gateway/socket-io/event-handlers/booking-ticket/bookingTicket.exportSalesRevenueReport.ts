import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function exportSalesRevenueReportEvent(socket: Socket, service: Service) {
	const exportSalesRevenueReportEvent = {
		name: "exportSalesRevenueReport",
		method: "GET",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.exportSalesRevenueReport`
	} as ISocketEventSetting;

	eventProcess(socket, exportSalesRevenueReportEvent, service);
}

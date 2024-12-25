import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function exportPromotionLaunchingSeriesListEvent(socket: Socket, service: Service) {
	const exportPromotionLaunchingSeriesListEvent = {
		name: "exportPromotionLaunchingSeriesList",
		method: "GET",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.exportPromotionLaunchingSeriesList`
	} as ISocketEventSetting;

	eventProcess(socket, exportPromotionLaunchingSeriesListEvent, service);
}


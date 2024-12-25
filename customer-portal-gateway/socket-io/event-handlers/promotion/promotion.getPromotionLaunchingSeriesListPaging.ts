import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function getPromotionLaunchingSeriesListPagingEvent(socket: Socket, service: Service) {
	const getPromotionLaunchingSeriesListPagingEvent = {
		name: "getPromotionLaunchingSeriesListPaging",
		method: "GET",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.getPromotionLaunchingSeriesListPaging`
	} as ISocketEventSetting;

	eventProcess(socket, getPromotionLaunchingSeriesListPagingEvent, service);
}


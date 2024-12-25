import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function findOnePromotionLaunchingSeriesCodeEvent(socket: Socket, service: Service) {
	const findOnePromotionLaunchingSeriesCodeEvent = {
		name: "findOnePromotionLaunchingSeriesCode",
		method: "GET",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.findOnePromotionLaunchingSeriesCode`
	} as ISocketEventSetting;

	eventProcess(socket, findOnePromotionLaunchingSeriesCodeEvent, service);
}


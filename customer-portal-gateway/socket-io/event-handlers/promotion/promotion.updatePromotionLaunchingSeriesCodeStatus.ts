import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function updatePromotionLaunchingSeriesCodeStatusEvent(socket: Socket, service: Service) {
	const updatePromotionLaunchingSeriesCodeStatusEvent = {
		name: "updatePromotionLaunchingSeriesCodeStatus",
		method: "PUT",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.updatePromotionLaunchingSeriesCodeStatus`
	} as ISocketEventSetting;

	eventProcess(socket, updatePromotionLaunchingSeriesCodeStatusEvent, service);
}


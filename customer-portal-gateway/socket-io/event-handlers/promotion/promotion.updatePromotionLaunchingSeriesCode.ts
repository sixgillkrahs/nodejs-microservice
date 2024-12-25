import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function updatePromotionLaunchingSeriesCodeEvent(socket: Socket, service: Service) {
	const updatePromotionLaunchingSeriesCodeEvent = {
		name: "updatePromotionLaunchingSeriesCode",
		method: "PUT",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.updatePromotionLaunchingSeriesCode`
	} as ISocketEventSetting;

	eventProcess(socket, updatePromotionLaunchingSeriesCodeEvent, service);
}


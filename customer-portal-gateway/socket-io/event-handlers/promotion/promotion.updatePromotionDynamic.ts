import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function updatePromotionDynamicEvent(socket: Socket, service: Service) {
	const updatePromotionDynamicEvent = {
		name: "updatePromotionDynamic",
		method: "PUT",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.updatePromotionDynamic`
	} as ISocketEventSetting;

	eventProcess(socket, updatePromotionDynamicEvent, service);
}
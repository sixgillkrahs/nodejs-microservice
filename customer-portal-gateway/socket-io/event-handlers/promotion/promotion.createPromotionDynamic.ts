import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function createPromotionDynamicEvent(socket: Socket, service: Service) {
	const createPromotionDynamicEvent = {
		name: "createPromotionDynamic",
		method: "POST",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.createPromotionDynamic`
	} as ISocketEventSetting;

	eventProcess(socket, createPromotionDynamicEvent, service);
}

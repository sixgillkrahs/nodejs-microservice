import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function createPromotionDynamicAutoEvent(socket: Socket, service: Service) {
	const createPromotionDynamicAutoEvent = {
		name: "createPromotionDynamicAuto",
		method: "POST",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.createPromotionDynamicAuto`
	} as ISocketEventSetting;

	eventProcess(socket, createPromotionDynamicAutoEvent, service);
}


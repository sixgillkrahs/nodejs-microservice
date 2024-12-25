import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function deletePromotionDynamicEvent(socket: Socket, service: Service) {
	const deletePromotionDynamicEvent = {
		name: "deletePromotionDynamic",
		method: "DELETE",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.deletePromotionDynamic`
	} as ISocketEventSetting;

	eventProcess(socket, deletePromotionDynamicEvent, service);
}


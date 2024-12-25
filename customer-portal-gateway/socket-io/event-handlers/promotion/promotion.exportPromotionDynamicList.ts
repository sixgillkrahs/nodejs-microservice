import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function exportPromotionDynamicListEvent(socket: Socket, service: Service) {
	const exportPromotionDynamicListEvent = {
		name: "exportPromotionDynamicListPaging",
		method: "GET",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.exportPromotionDynamicList`
	} as ISocketEventSetting;

	eventProcess(socket, exportPromotionDynamicListEvent, service);
}


import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function updateNewsEvent(socket: Socket, service: Service) {
	const updateNewsEvent = {
		name: "updateNews",
		method: "PUT",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.updateNews`
	} as ISocketEventSetting;

	eventProcess(socket, updateNewsEvent, service);
}


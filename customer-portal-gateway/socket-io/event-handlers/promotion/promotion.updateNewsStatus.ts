import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function updateNewsStatusEvent(socket: Socket, service: Service) {
	const updateNewsStatusEvent = {
		name: "updateNewsStatus",
		method: "PUT",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.updateNewsStatus`
	} as ISocketEventSetting;

	eventProcess(socket, updateNewsStatusEvent, service);
}


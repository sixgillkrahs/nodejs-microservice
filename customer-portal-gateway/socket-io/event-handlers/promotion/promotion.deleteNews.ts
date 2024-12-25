import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function deleteNewsEvent(socket: Socket, service: Service) {
	const deleteNewsEvent = {
		name: "deleteNews",
		method: "DELETE",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.deleteNews`
	} as ISocketEventSetting;

	eventProcess(socket, deleteNewsEvent, service);
}


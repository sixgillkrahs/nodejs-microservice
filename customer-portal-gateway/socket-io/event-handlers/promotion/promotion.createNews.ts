import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function createNewsEvent(socket: Socket, service: Service) {
	const createNewsEvent = {
		name: "createNews",
		method: "POST",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.createNews`
	} as ISocketEventSetting;

	eventProcess(socket, createNewsEvent, service);
}


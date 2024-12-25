import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function findOneNewsEvent(socket: Socket, service: Service) {
	const findOneNewsEvent = {
		name: "findOneNews",
		method: "GET",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.findOneNews`
	} as ISocketEventSetting;

	eventProcess(socket, findOneNewsEvent, service);
}


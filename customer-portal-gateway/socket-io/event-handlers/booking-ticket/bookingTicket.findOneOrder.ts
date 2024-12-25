import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function findOneOrderEvent(socket: Socket, service: Service) {
	const findOneOrderEvent = {
		name: "findOneOrder",
		method: "GET",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.findOneOrder`
	} as ISocketEventSetting;

	eventProcess(socket, findOneOrderEvent, service);
}


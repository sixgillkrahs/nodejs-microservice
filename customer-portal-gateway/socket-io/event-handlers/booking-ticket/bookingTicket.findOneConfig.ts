import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function findOneConfigEvent(socket: Socket, service: Service) {
	const findOneConfigEvent = {
		name: "findOneConfig",
		method: "GET",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.findOneConfig`
	} as ISocketEventSetting;

	eventProcess(socket, findOneConfigEvent, service);
}


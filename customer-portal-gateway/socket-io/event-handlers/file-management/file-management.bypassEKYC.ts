import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function bypassEKYCEvent(socket: Socket, service: Service) {
	const bypassEKYCEvent = {
		name: "bypassEKYC",
		method: "POST",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.bypassEKYC`
	} as ISocketEventSetting;

	eventProcess(socket, bypassEKYCEvent, service);
}


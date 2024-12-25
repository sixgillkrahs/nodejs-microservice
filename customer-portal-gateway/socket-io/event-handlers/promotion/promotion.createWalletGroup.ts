import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function createWalletGroupEvent(socket: Socket, service: Service) {
	const createWalletGroupEvent = {
		name: "createWalletGroup",
		method: "POST",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.createWalletGroup`
	} as ISocketEventSetting;

	eventProcess(socket, createWalletGroupEvent, service);
}


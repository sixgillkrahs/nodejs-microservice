import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function updateWalletGroupEvent(socket: Socket, service: Service) {
	const updateWalletGroupEvent = {
		name: "updateWalletGroup",
		method: "PUT",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.updateWalletGroup`
	} as ISocketEventSetting;

	eventProcess(socket, updateWalletGroupEvent, service);
}


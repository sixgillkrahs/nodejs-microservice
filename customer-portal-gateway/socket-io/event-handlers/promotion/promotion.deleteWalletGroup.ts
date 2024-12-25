import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function deleteWalletGroupEvent(socket: Socket, service: Service) {
	const deleteWalletGroupEvent = {
		name: "deleteWalletGroup",
		method: "DELETE",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.deleteWalletGroup`
	} as ISocketEventSetting;

	eventProcess(socket, deleteWalletGroupEvent, service);
}


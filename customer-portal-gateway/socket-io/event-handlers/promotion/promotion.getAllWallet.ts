import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function getAllWalletEvent(socket: Socket, service: Service) {
	const getAllWalletEvent = {
		name: "getAllWallet",
		method: "POST",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.getAllWallet`
	} as ISocketEventSetting;

	eventProcess(socket, getAllWalletEvent, service);
}


import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function getAllWalletGroupPagingEvent(socket: Socket, service: Service) {
	const getAllWalletGroupPagingEvent = {
		name: "getAllWalletGroupPaging",
		method: "GET",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.getAllWalletGroupPaging`
	} as ISocketEventSetting;

	eventProcess(socket, getAllWalletGroupPagingEvent, service);
}


import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function getWalletGroupDetailEvent(socket: Socket, service: Service) {
	const getWalletGroupDetailEvent = {
		name: "getWalletGroupDetail",
		method: "GET",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.getWalletGroupDetail`
	} as ISocketEventSetting;

	eventProcess(socket, getWalletGroupDetailEvent, service);
}

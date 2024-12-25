import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function findOneCampaignEvent(socket: Socket, service: Service) {
	const findOneCampaignEvent = {
		name: "findOneCampaign",
		method: "GET",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.findOneCampaign`
	} as ISocketEventSetting;

	eventProcess(socket, findOneCampaignEvent, service);
}


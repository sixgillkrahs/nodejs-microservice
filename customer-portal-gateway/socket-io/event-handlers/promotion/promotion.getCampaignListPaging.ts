import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function getCampaignListPagingEvent(socket: Socket, service: Service) {
	const getCampaignListPagingEvent = {
		name: "getCampaignListPaging",
		method: "GET",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.getCampaignListPaging`
	} as ISocketEventSetting;

	eventProcess(socket, getCampaignListPagingEvent, service);
}


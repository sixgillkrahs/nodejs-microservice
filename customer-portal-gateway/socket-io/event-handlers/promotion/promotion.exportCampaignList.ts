import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function exportCampaignListEvent(socket: Socket, service: Service) {
	const exportCampaignListEvent = {
		name: "exportCampaignList",
		method: "GET",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.exportCampaignList`
	} as ISocketEventSetting;

	eventProcess(socket, exportCampaignListEvent, service);
}


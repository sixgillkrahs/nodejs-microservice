import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function updateCampaignEvent(socket: Socket, service: Service) {
	const updateCampaignEvent = {
		name: "updateCampaign",
		method: "PUT",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.updateCampaign`
	} as ISocketEventSetting;

	eventProcess(socket, updateCampaignEvent, service);
}


import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function getCampaignByWalletGroupIdEvent(socket: Socket, service: Service) {
	const getCampaignByWalletGroupIdEvent = {
		name: "getCampaignByWalletGroupId",
		method: "GET",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.getCampaignByWalletGroupId`
	} as ISocketEventSetting;

	eventProcess(socket, getCampaignByWalletGroupIdEvent, service);
}


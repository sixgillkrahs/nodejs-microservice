import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function getCampaignListByApplyForMerchantAndUserIdEvent(socket: Socket, service: Service) {
	const getCampaignListByApplyForMerchantAndUserIdEvent = {
		name: "getCampaignListByApplyForMerchantAndUserId",
		method: "GET",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.getCampaignListByApplyForMerchantAndUserId`
	} as ISocketEventSetting;

	eventProcess(socket, getCampaignListByApplyForMerchantAndUserIdEvent, service);
}


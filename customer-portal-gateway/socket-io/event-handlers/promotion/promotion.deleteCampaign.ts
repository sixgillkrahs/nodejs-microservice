import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function deleteCampaignEvent(socket: Socket, service: Service) {
	const deleteCampaignEvent = {
		name: "deleteCampaign",
		method: "DELETE",
		serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.deleteCampaign`
	} as ISocketEventSetting;

	eventProcess(socket, deleteCampaignEvent, service);
}

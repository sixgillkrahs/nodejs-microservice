import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function getSettingDetailEvent(socket: Socket, service: Service) {
    const getSettingDetailEvent = {
        name: "getSettingDetail",
        method: "GET",
        serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.getSettingDetail`
    } as ISocketEventSetting;

    eventProcess(socket, getSettingDetailEvent, service);
}

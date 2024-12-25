import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function updateSettingEvent(socket: Socket, service: Service) {
    const updateSettingEvent = {
        name: "updateSetting",
        method: "PUT",
        serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.updateSetting`
    } as ISocketEventSetting;

    eventProcess(socket, updateSettingEvent, service);
}

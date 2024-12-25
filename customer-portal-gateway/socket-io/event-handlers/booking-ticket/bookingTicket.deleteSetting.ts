import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function deleteSettingEvent(socket: Socket, service: Service) {
    const deleteSettingEvent = {
        name: "deleteSetting",
        method: "DELETE",
        serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.deleteSetting`
    } as ISocketEventSetting;

    eventProcess(socket, deleteSettingEvent, service);
}

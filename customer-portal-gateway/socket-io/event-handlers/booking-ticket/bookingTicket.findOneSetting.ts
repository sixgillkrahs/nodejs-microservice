import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function findOneSettingEvent(socket: Socket, service: Service) {
    const findOneSettingEvent = {
        name: "findOneSetting",
        method: "GET",
        serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.findOneSetting`
    } as ISocketEventSetting;

    eventProcess(socket, findOneSettingEvent, service);
}

import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";


export function getPagingSettingEvent(socket: Socket, service: Service) {
    const getPagingSetting = {
        name: "getPagingSetting",
        method: "GET",
        serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.getPagingSetting`
    } as ISocketEventSetting;

    eventProcess(socket, getPagingSetting, service);
}
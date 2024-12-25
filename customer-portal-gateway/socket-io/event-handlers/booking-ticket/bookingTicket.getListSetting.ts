import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";


export function getListSettingEvent(socket: Socket, service: Service) {
    const GetListSetting = {
        name: "getList",
        method: "GET",
        serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.getList`
    } as ISocketEventSetting;

    eventProcess(socket, GetListSetting, service);
}
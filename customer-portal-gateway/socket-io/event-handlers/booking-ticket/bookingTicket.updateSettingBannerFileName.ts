import { Service } from "moleculer";
import { Socket } from "socket.io";
import { ISocketEventSetting } from "../../../data-transfer/ISocketEventSetting";
import { SVC_ENV } from "../../../svc-env";
import { eventProcess } from "../../event";

export function updateSettingBannerFileNameEvent(socket: Socket, service: Service) {
    const updateSettingBannerFileNameEvent = {
        name: "updateSettingBannerFileName",
        method: "PUT",
        serviceAction: `v1.${SVC_ENV.get().INTEGRATE_SERVICE_V1}.updateSettingBannerFileName`
    } as ISocketEventSetting;

    eventProcess(socket, updateSettingBannerFileNameEvent, service);
}

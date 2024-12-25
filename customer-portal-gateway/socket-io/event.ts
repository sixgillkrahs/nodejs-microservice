import { Service } from "moleculer";
import { Socket } from "socket.io";
import { IParamService } from "../data-transfer/IParamService";
import { IResponseService } from "../data-transfer/IResponseService";
import { ISocketEventSetting } from "../data-transfer/ISocketEventSetting";
import { SocketInterceptor } from "../interceptors";
import {
	getListNotice,


	/* Bán Vé */
	deleteSettingEvent,
	updateSettingEvent,
	updateStatusEvent,
	createSettingEvent,
	findOneSettingEvent,
	getSettingDetailEvent,
	getListSettingEvent,
	getPagingSettingEvent,
	getOrderListPagingEvent,
	findOneOrderEvent,
	exportOrderListEvent,
	getOrderReportListPagingEvent,
	exportOrderReportListEvent,
	getSalesRevenueReportEvent,
	getCanceledTicketListEvent,
	exportCanceledTicketListReportEvent,
	getStatisticListEvent,
	exportStatisticListReportEvent,
	GenTokenFutaBusEvent,
	updateSettingBannerFileNameEvent,
	getSettingBannerFileNameEvent,
	findOneConfigEvent,

	/* PROMOTION */
	getPromotionLaunchingSeriesListPagingEvent,
	findOnePromotionLaunchingSeriesCodeEvent,
	createPromotionLaunchingSeriesCodeEvent,
	updatePromotionLaunchingSeriesCodeEvent,
	deletePromotionLaunchingSeriesCodeEvent,
	updatePromotionLaunchingSeriesCodeStatusEvent,
	getPromotionDynamicEvent,
	updatePromotionDynamicEvent,
	createPromotionDynamicEvent,
	deletePromotionDynamicEvent,
	createPromotionDynamicAutoEvent,
	getCampaignListPagingEvent,
	createCampaignEvent,
	findOneCampaignEvent,
	updateCampaignEvent,
	deleteCampaignEvent,
	updateCampaignStatusEvent,
	exportCampaignListEvent,
	getCampaignListByApplyForMerchantAndUserIdEvent,
	getNewsListPagingEvent,
	createNewsEvent,
	updateNewsEvent,
	findOneNewsEvent,
	deleteNewsEvent,
	updateNewsStatusEvent,


	/* PROMOTION GROUP*/
	getAllWalletGroupPagingEvent,
	createWalletGroupEvent,
	deleteWalletGroupEvent,
	updateWalletGroupEvent,
	getWalletGroupDetailEvent,
	getAllWalletEvent
} from "./event-handlers";

export function socketEventHandle(socket: Socket, service: Service) {
	/** Listen on events: events defined at here as event login */
	getListNotice(socket, service);

	/* Bán Vé */
	deleteSettingEvent(socket, service);
	updateSettingEvent(socket, service);
	updateStatusEvent(socket, service);
	createSettingEvent(socket, service);
	findOneSettingEvent(socket, service);
	getSettingDetailEvent(socket, service);
	getListSettingEvent(socket, service);
	getPagingSettingEvent(socket, service);
	getOrderListPagingEvent(socket, service);
	findOneOrderEvent(socket, service);
	exportOrderListEvent(socket, service);
	getOrderReportListPagingEvent(socket,service);
	exportOrderReportListEvent(socket,service);
	getSalesRevenueReportEvent(socket,service);
	getCanceledTicketListEvent(socket,service);
	exportCanceledTicketListReportEvent(socket,service);
	getStatisticListEvent(socket,service);
	exportStatisticListReportEvent(socket,service);
	GenTokenFutaBusEvent(socket,service);
	updateSettingBannerFileNameEvent(socket,service);
	getSettingBannerFileNameEvent(socket,service);
	findOneConfigEvent(socket,service);

	/* PROMOTION */
	getPromotionLaunchingSeriesListPagingEvent(socket,service);
	findOnePromotionLaunchingSeriesCodeEvent(socket,service);
	createPromotionLaunchingSeriesCodeEvent(socket,service);
	updatePromotionLaunchingSeriesCodeEvent(socket,service);
	deletePromotionLaunchingSeriesCodeEvent(socket,service);
	updatePromotionLaunchingSeriesCodeStatusEvent(socket,service);
	createPromotionDynamicAutoEvent(socket,service);
	getPromotionDynamicEvent(socket,service);
	updatePromotionDynamicEvent(socket,service);
	createPromotionDynamicEvent(socket,service);
	deletePromotionDynamicEvent(socket,service);
	getCampaignListPagingEvent(socket,service);
	createCampaignEvent(socket,service);
	findOneCampaignEvent(socket,service);
	updateCampaignEvent(socket,service);
	deleteCampaignEvent(socket,service);
	updateCampaignStatusEvent(socket,service);
	getCampaignListByApplyForMerchantAndUserIdEvent(socket,service);
	getNewsListPagingEvent(socket,service);
	createNewsEvent(socket,service);
	updateNewsEvent(socket,service);
	findOneNewsEvent(socket,service);
	deleteNewsEvent(socket,service);
	updateNewsStatusEvent(socket,service);
	
	/* PROMOTION GROUP*/
	getAllWalletGroupPagingEvent(socket,service);
	createWalletGroupEvent(socket, service);
	deleteWalletGroupEvent(socket, service);
	updateWalletGroupEvent(socket, service);
	getWalletGroupDetailEvent(socket, service);
	getAllWalletEvent(socket, service)
}
export const eventProcess = (
	socket: Socket,
	setting: ISocketEventSetting,
	service: Service,
	options?: { cbResolve?: Function; cbReject?: Function; validator?: Function }
): void => {
	socket.on(setting.name, (params) => {
		/** Processing request */
		SocketInterceptor.processRequest(socket, setting, params, service)
			.then((contextFact) => {
				if (options?.validator) {
					options.validator(contextFact, params);
				}
				return contextFact.call<IResponseService, IParamService>(
					setting.serviceAction,
					contextFact.params as IParamService,
					{ meta: contextFact.meta }
				);
			})
			.then((res) => {
				if (options?.cbResolve) {
					options.cbResolve();
				} else {
					socket.emit(
						setting.name,
						SocketInterceptor.processResponse(socket, res, service, setting)
					);
				}
			})
			.catch((err) => {
				service.broker.logger.error(err);
				if (options?.cbReject) {
					options.cbReject(err);
				} else {
					socket.emit(
						setting.name,
						SocketInterceptor.processError(socket, err, service, setting)
					);
				}
			});
	});
};

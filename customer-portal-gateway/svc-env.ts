import _ from "lodash";
import { ServiceBroker } from "moleculer";

export const REQUIRED_KEYS = [
	"SERVICE_NAME",
	"PORT",
	"PATH_PORTAL",
	"ADAPTER_SOCKET_REDIS_HOST",
	"ADAPTER_SOCKET_REDIS_PORT",
	"ADAPTER_SOCKET_REDIS_AUTH_PASS",
	"REDIS_HOST",
	"REDIS_PORT",
	"REDIS_PASS",
	"REDIS_DB",
	"ORIGIN",
	"ADMIN_PORTAL_URL",

	"INTEGRATE_SERVICE_V1",
	"MERCHANT_SERVICE",
	"AUTH_SERVICE",
	"USER_SERVICE",
	"PAYMENT_SERVICE",
	"PAYMENT_BILL_SERVICE",
	"CUSTOMER_SERVICE",
	"MOBILE_SERVICE",
	"CORE_TRANS_PROXY_SERVICE",
	"CORE_TRANS_PROXY_HISTORY_SERVICE",
	"NOTIFICATION_SERVICE",
	"CONFIG_SERVICE",
	"BANK_SERVICE",
	"CORE_TRANS_PROXY_SERVICE",
	"RULE_SERVICE",
	"NAPAS_CONNECTOR_SERVICE",
	"PROFILE_SERVICE",
	"TICKET_SERVICE",
	"ARTICLE_SERVICE",
	"DATA_VIEW_SERVICE",
	"WEB_PORTAL_PUBLIC_DIR",
	"DATA_VIEW_SERVICE",
	"COMMON_CONNECTOR_SERVICE",
	"SUPERSET_USERNAME",
	"SUPERSET_PASSWORD",
	"SUPERSET_PROVIDER",
	"SUPERSET_DOMAIN",
	"SCHEDULER_SERVICE",
	"ACCOUNT_SERVICE",
	"BOOKING_TICKET_SERVICE",
	"PROMOTION_SERVICE",
	"FILE_MANAGEMENT_SERVICE",
	"ENTERPRISE_SERVICE",

	"VAULT_ENDPOINT",
	"VAULT_VERSION",
	"VAULT_ROLE_ID",
	"VAULT_SECRET_ID",
	"VAULT_KV_PATH"
];
interface IEnvironmentField {
	SERVICE_NAME?: string;
	NAMESPACE?: string;
	PORT?: string;
	NATS?: string;
	PATH_PORTAL?: string;
	ADAPTER_SOCKET_REDIS_HOST?: string;
	ADAPTER_SOCKET_REDIS_PORT?: string;
	ADAPTER_SOCKET_REDIS_AUTH_PASS?: string;
	REDIS_HOST?: string;
	REDIS_PORT?: string;
	REDIS_PASS?: string;
	REDIS_DB?: string;
	ORIGIN?: string;
	ADMIN_PORTAL_URL?: string;

	INTEGRATE_SERVICE_V1?: string;
	MERCHANT_SERVICE?: string;
	AUTH_SERVICE?: string;
	USER_SERVICE?: string;
	PAYMENT_SERVICE?: string;
	PAYMENT_BILL_SERVICE?: string;
	CUSTOMER_SERVICE?: string;
	MOBILE_SERVICE?: string;
	CORE_TRANS_PROXY_SERICE?: string;
	CORE_TRANS_PROXY_HISTORY_SERVICE?: string;
	NOTIFICATION_SERVICE?: string;
	CONFIG_SERVICE?: string;
	BANK_SERVICE?: string;
	CORE_TRANS_PROXY_SERVICE?: string;
	RULE_SERVICE?: string;
	NAPAS_CONNECTOR_SERVICE?: string;
	PROFILE_SERVICE?: string;
	TICKET_SERVICE?: string;
	ARTICLE_SERVICE?: string;
	WEB_PORTAL_PUBLIC_DIR?: string;
	DATA_VIEW_SERVICE?: string;
	COMMON_CONNECTOR_SERVICE?: string;
	SUPERSET_USERNAME?: string;
	SUPERSET_PASSWORD?: string;
	SUPERSET_PROVIDER?: string;
	SUPERSET_DOMAIN?: string;
	SCHEDULER_SERVICE?: string;
	ACCOUNT_SERVICE?: string;
	BOOKING_TICKET_SERVICE?: string;
	PROMOTION_SERVICE?: string;
	FILE_MANAGEMENT_SERVICE?: string;
	ENTERPRISE_SERVICE?: string;

	VAULT_ENDPOINT?: string;
	VAULT_VERSION?: string;
	VAULT_ROLE_ID?: string;
	VAULT_SECRET_ID?: string;
	VAULT_KV_PATH?: string;
}


export class SVC_ENV {
	public static _env: any = {};

	public static setEnvForTesting(env: any): void {
		this._env = env;
	}

	public static set(key: string, val: any): void {
		this._env[key] = val;
	}

	public static get(): IEnvironmentField {
		return this._env;
	}

	public static setEnvironmentsFromEnv(broker: ServiceBroker, serviceName: string) {
		let envServices = broker.services.find(x => x.name === serviceName)?.settings?.envServices;
		if (_.isEmpty(envServices)) {
			console.log("Load Env Service From Broker.EnvServices");
			envServices = broker.envServices ? broker.envServices[serviceName] : null;
		}
		if (_.isEmpty(envServices)) {
			console.log("Load Env Service From Process.Env");
			envServices = JSON.parse(JSON.stringify(process.env));
		}
		Object.keys(envServices).forEach(item => {
			SVC_ENV.set(item, envServices[item] || "");
		});
	}
};

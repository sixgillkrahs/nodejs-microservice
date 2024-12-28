import _ from "lodash";
import { ServiceBroker } from "moleculer";

export const REQUIRED_KEYS = [
	"SERVICE_NAME",
	"PORT",
	"PATH_PORTAL",
	"ADAPTER_SOCKET_REDIS_PORT",
	"ADAPTER_SOCKET_REDIS_AUTH_PASS",
	"ADAPTER_SOCKET_REDIS_HOST",
	"REDIS_HOST",
	"REDIS_PORT",
	"REDIS_PASS",
	"REDIS_DB",
	"ORIGIN",
	"ADMIN_PORTAL_URL",

	"INTEGRATE_SERVICE_V1",
	"AUTH_SERVICE",
	"USER_SERVICE",
	"CUSTOMER_SERVICE",
	"WEB_PORTAL_PUBLIC_DIR",
	"ACCOUNT_SERVICE",
];
interface IEnvironmentField {
	SERVICE_NAME?: string;
	NAMESPACE?: string;
	PORT?: string;
	NATS?: string;
	PATH_PORTAL?: string;
	ADAPTER_SOCKET_REDIS_PORT?: string;
	ADAPTER_SOCKET_REDIS_AUTH_PASS?: string;
	ADAPTER_SOCKET_REDIS_HOST?: string;
	REDIS_HOST?: string;
	REDIS_PORT?: string;
	REDIS_PASS?: string;
	REDIS_DB?: string;
	ORIGIN?: string;
	ADMIN_PORTAL_URL?: string;

	INTEGRATE_SERVICE_V1?: string;
	AUTH_SERVICE?: string;
	USER_SERVICE?: string;
	CUSTOMER_SERVICE?: string;
	WEB_PORTAL_PUBLIC_DIR?: string;
	ACCOUNT_SERVICE?: string;
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

	public static setEnvironmentsFromEnv(
		broker: ServiceBroker,
		serviceName: string
	) {
		let envServices = broker.services.find((x) => x.name === serviceName)
			?.settings?.envServices;
		if (_.isEmpty(envServices)) {
			console.log("Load Env Service From Broker.EnvServices");
			envServices = broker.envServices ? broker.envServices[serviceName] : null;
		}
		if (_.isEmpty(envServices)) {
			console.log("Load Env Service From Process.Env");
			envServices = JSON.parse(JSON.stringify(process.env));
		}
		Object.keys(envServices).forEach((item) => {
			SVC_ENV.set(item, envServices[item] || "");
		});
	}
}

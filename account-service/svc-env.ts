import { ServiceBroker } from "moleculer";
import _ from "lodash";

interface IEnvironmentField {
	SERVICE_NAME?: string;
	PORT?: string;
	MONGO_URI?: string;

	USER_SERVICE?: string;
	STORAGE_GATEWAY?: string;

}

export const REQUIRED_KEYS = [
	"SERVICE_NAME",
	"PORT",
	"MONGO_URI",

	"USER_SERVICE",
	"STORAGE_GATEWAY",
];

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
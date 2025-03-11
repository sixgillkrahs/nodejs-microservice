import _ from "lodash";
import { ServiceBroker } from "moleculer";

export const REQUIRED_KEYS = [
  "SERVICE_NAME",
  "PORT",
  "MONGO_URI",
  "REDIS_HOST",
  "REDIS_PORT",
  "REDIS_PASS",
  "REDIS_DB",

  "AUTH_SERVICE",

  "JWT_KEY",
];

interface IEnvironmentField {
  readonly SERVICE_NAME: string;
  readonly PORT: string;
  readonly MONGO_URI: string;

  readonly REDIS_HOST: string;
  readonly REDIS_PORT: string;
  readonly REDIS_PASS: string;
  readonly REDIS_DB: string;

  readonly AUTH_SERVICE: string;

  readonly JWT_KEY: string;
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

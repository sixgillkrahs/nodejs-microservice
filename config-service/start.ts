import { Service, ServiceBroker } from "moleculer";
import paginate from "mongoose-paginate-v2";
import MongoDb from "./dbHandler/mongo";
import { trackingIn, trackingOut } from "./middlewares";
import { SVC_ENV } from "./svc-env";
import { BaseModel } from "./models";
import { BaseLogic } from "./logic";

const ServiceName = "config-service";
const ServicePort = 5005;

class ConfigService extends Service {
  private baseModel: BaseModel;

  public constructor(broker: ServiceBroker) {
    super(broker);
    this.broker = broker;
    this.loadEnvAndInitService();
    this.parseServiceSchema({
      name: ServiceName,
      mixins: [],
      settings: {
        port: ServicePort,
      },
      actions: {
        heathCheck: {
          desc: "Check service status ready working",
          handler: (ctx) => "OK",
        },
        //config
        getConfigByKey: {
          desc: "",
          handler: (ctx) => this.baseLogic.getConfigByKey(ctx),
        },
      },
      events: {},
      methods: {},
      created: this.serviceCreated,
      started: this.serviceStarted,
      stopped: this.serviceStopped,
      hooks: {
        /** Verify all expression before action call */
        before: {
          "*": [trackingIn],
        },
        /** Verify data return or something jobs after action was called */
        after: {
          "*": [trackingOut],
        },
      },
    });
  }
  private serviceCreated() {
    this.logger.info(ServiceName);
  }

  private serviceStarted(): Promise<void> {
    this.logger.info(ServiceName);
    return;
  }

  private serviceStopped(): Promise<void> {
    this.logger.info(ServiceName);
    return;
  }

  private initService(): void {
    const dbHandler = new MongoDb(this.logger);
    dbHandler.createConnection((err, dbConnection) => {
      if (err) {
        this.logger.error(err);
        this.stopService(this.broker, "STOP_SERVICE_ERR_CONNECT_DB");
        return;
      }
      /** Init models and install plugins use for model*/
      const plugins = [paginate];
      const models = {
        BaseModel: new BaseModel(this.logger, dbConnection, plugins),
      };
      this.baseLogic = new BaseLogic({
        logger: this.logger,
        dbConnection,
        models,
      });
    });
    return;
  }

  private async loadEnvAndInitService(): Promise<void> {
    SVC_ENV.setEnvironmentsFromEnv(this.broker, ServiceName);
    this.initService();
  }

  private stopService(broker: ServiceBroker, messageOut: string) {
    broker
      .destroyService(
        broker.services.find((x) => x.name === SVC_ENV.get().SERVICE_NAME)
      )
      .then(() => broker.logger.fatal(messageOut, SVC_ENV.get().SERVICE_NAME))
      .catch((stopSvcError) => broker.logger.fatal(stopSvcError));
  }
}

export = ConfigService;

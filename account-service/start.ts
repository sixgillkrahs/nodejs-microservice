import { Service, ServiceBroker } from "moleculer";
import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import MongoDb from "./dbHandler/mongo";
import { SVC_ENV } from "./svc-env";

const ServiceName = "account-service";


class AccountService extends Service {
    public constructor(broker: ServiceBroker) {
        super(broker);
        this.broker = broker;
        this.loadEnvAndInitService();
        this.parseServiceSchema({
            name: ServiceName,
            mixins: [],
            settings: {
				port: SVC_ENV.get().PORT
			},
            actions: {
                heathCheck: {
					desc: "Check service status ready working",
					handler: ctx => "OK"
				},
            },
            methods: {},
            created: this.serviceCreated,
			started: this.serviceStarted,
			stopped: this.serviceStopped,
        });
    }

    private serviceCreated() {
		this.logger.info(`${ServiceName} created.`);
	}

	private serviceStarted(): void {
		/** Init Dependencies For This Service */
		this.logger.info(`${ServiceName} started.`);
	}

	private serviceStopped(): void {
		this.logger.info(`${ServiceName} stopped.`);
	}

    private initService(): void {
        const dbHandler = new MongoDb(this.logger);
        mongoose.connect(SVC_ENV.get().MONGO_URI || "")
        .then(r => r)
        .catch(err => {
			this.logger.error(err);
		});
        dbHandler.createConnection((err, dbConnection) => {
            if (err) {
				this.logger.error(err);
				throw new Error(
					"Connect to database error, please check MONGO_URI at .run.env"
				);
			}
            const plugins = [paginate];
            const models = {
			};
        })
    }

    private async loadEnvAndInitService(): Promise<void> {
		SVC_ENV.setEnvironmentsFromEnv(this.broker, ServiceName);
		this.initService();
	}

}

export = AccountService;
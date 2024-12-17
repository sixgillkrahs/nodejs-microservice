import { LoggerInstance } from "moleculer";
import mongoose from "mongoose";
import { SVC_ENV } from "../svc-env";

class MongoDb {
     private logger: LoggerInstance;
     public constructor(logger: LoggerInstance) {
        this.logger = logger;
     }

     public createConnection(next: (err: Error | null, connection: mongoose.Connection | null) => void) {
        mongoose
        .createConnection(SVC_ENV.get().MONGO_URI || "", {})
        .asPromise()
        .then(resp => {
            if (resp.readyState === 1) {
            mongoose.set("debug", true);
            next(null, resp);
            } else {
            throw new Error(`Failed to connect mongodb with state: ${resp.readyState}`);
            }
        })
        .catch(err => {
            this.logger.error(err);
            next(err, null);
        });
    }
}

export = MongoDb;
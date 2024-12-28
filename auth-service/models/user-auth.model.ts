import { LoggerInstance } from "moleculer";
import { MongoFuncHelper } from "goopay-library/helpers";
import _ from "lodash";
import mongoose, { Connection, Schema } from "mongoose";
import { Entities } from "../data-transfers";
import { DB_COLLECTION, USER_TYPE } from "../defined/app-setting";

class UserAuthModel {
  private readonly logger: LoggerInstance;
  private readonly dbConnection: Connection | null;
  private readonly schema: Schema<Entities.UserAuthEntity>;
  private readonly model: any;

  constructor(
    logger: LoggerInstance,
    dbConnection: Connection | null,
    plugins: any[] = []
  ) {
    this.logger = logger;
    this.dbConnection = dbConnection;
    this.schema = new Schema<Entities.UserAuthEntity>(
      {
        email: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          trim: true,
        },
        userType: { type: String, default: USER_TYPE.USER },
        userId: { type: String, required: true, unique: true },
        social: { type: Object, default: null },
        password: { type: String, required: true },
        isActive: { type: Boolean, required: true, default: true },
        isVerified: { type: Boolean, required: true, default: false },
        isDelete: { type: Boolean, default: false },
        passwordHistory: [
          {
            password: { type: String, default: null },
            createdAt: { type: Date, default: null },
          },
        ],
        phone: { type: String },
        state: { type: String },
        lockUntil: { type: Date, required: false, default: null },
        lastUpdatePassword: { type: Date, required: false, default: null },
        createdAt: { type: Date, required: true, default: Date.now },
        lastUpdatedAt: { type: Date, required: true, default: Date.now },
      },
      { timestamps: { createdAt: "createdAt", updatedAt: "lastUpdatedAt" } }
    );

    plugins.forEach((plugin) => this.schema.plugin(plugin));
    this.schema.set("minimize", false);
    this.schema.set("toObject", { getters: true });
    this.schema.set("toJSON", { getters: true });
    this.model = this.dbConnection?.model<Entities.UserAuthEntity>(
      DB_COLLECTION.USER_AUTH,
      this.schema
    );
  }

  public async getAll(filter: object, sort: object = {}, select: object = {}) {
    return await MongoFuncHelper.$getAll(this.model, filter, sort, select);
  }

  public async getById(id: string | any) {
    return await MongoFuncHelper.$findOne(this.model, { _id: id });
  }

  public async create(ent: object) {
    return await MongoFuncHelper.$save(this.model, ent);
  }

  public async delete(ent: { _id: string | any }) {
    const filter = {
      _id: ent._id,
    };
    return await MongoFuncHelper.$deleteOne(this.model, filter);
  }

  public async update(ent: { _id: string | any }) {
    const filter = {
      _id: ent._id,
    };
    return await MongoFuncHelper.$updateOne(this.model, filter, ent);
  }

  public async findOne(filter: object) {
    return await MongoFuncHelper.$findOne(this.model, filter);
  }

  public async listPaging(
    filter: object,
    sort: object,
    skip: number = 0,
    limit: number = 20,
    select: object = {}
  ) {
    if (_.isEmpty(sort)) {
      sort = { createdAt: -1 };
    }
    if (!filter) {
      filter = {};
    }
    return await MongoFuncHelper.$listPaging(
      this.model,
      filter,
      sort,
      skip,
      limit,
      select
    );
  }
}

export = UserAuthModel;

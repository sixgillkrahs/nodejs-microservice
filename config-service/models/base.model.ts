import { LoggerInstance } from "moleculer";
import { MongoFuncHelper } from "goopay-library/helpers";
import _ from "lodash";
import mongoose, { Connection, Schema } from "mongoose";
import { Entities } from "../data-transfers";
import { DB_COLLECTION, USER_TYPE } from "../defined/app-setting";

class BaseModel {
  private readonly logger: LoggerInstance;
  private readonly dbConnection: Connection | null;
  private readonly schema: Schema<Entities.BaseEntity>;
  private readonly model: any;

  constructor(
    logger: LoggerInstance,
    dbConnection: Connection | null,
    plugins: any[] = []
  ) {
    this.logger = logger;
    this.dbConnection = dbConnection;
    this.schema = new Schema<Entities.BaseEntity>(
      {
        key: {
          type: String,
          required: true,
          unique: true,
          uppercase: true,
          trim: true,
        },
        value: {
          type: String,
          required: true,
          trim: true,
        },
      },
      { timestamps: { createdAt: "createdAt", updatedAt: "lastUpdatedAt" } }
    );

    plugins.forEach((plugin) => this.schema.plugin(plugin));
    this.schema.set("minimize", false);
    this.schema.set("toObject", { getters: true });
    this.schema.set("toJSON", { getters: true });
    this.model = this.dbConnection?.model<Entities.BaseEntity>(
      DB_COLLECTION.BASE,
      this.schema,
      DB_COLLECTION.BASE
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

export = BaseModel;

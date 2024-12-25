import { LoggerInstance } from "moleculer";
import _ from "lodash";
import mongoose, { Connection, Schema } from "mongoose";
import { Entities } from "../data-transfers";
import { DB_COLLECTION } from "../defined/app-setting";

class AccountModel {
	private readonly logger: LoggerInstance;
	private readonly dbConnection: Connection | null;
	private readonly schema: Schema<Entities.AccountEntity>;
	private readonly model: any;

	constructor(logger: LoggerInstance, dbConnection: Connection | null, plugins: any[] = []) {
		this.logger = logger;
		this.dbConnection = dbConnection;
		this.schema = new Schema<Entities.AccountEntity>(
			{
				email: { type: String, required: true, unique: true, lowercase: true, trim: true },
				userId: { type: String, required: true, unique: true },
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
			{ timestamps: { createdAt: "createdAt", updatedAt: "lastUpdatedAt" } },
		);

		plugins.forEach((plugin) => this.schema.plugin(plugin));
		this.schema.set("minimize", false);
		this.schema.set("toObject", { getters: true });
		this.schema.set("toJSON", { getters: true });
		this.model = this.dbConnection?.model<Entities.AccountEntity>(
			DB_COLLECTION.ACCOUNTS,
			this.schema,
		);
	}

	public async getAll(filter: object, sort: object = {}, select: object = {}) {
		return await this.model.find(filter, select).sort(sort).lean();
	}

	public async getById(_id: string, isWithOutCheckDelete = false, select: object = {}) {
		try {
			let id = "";
			if (mongoose.isValidObjectId(id) && typeof id === "object") {
				id = _id;
			} else if (mongoose.isValidObjectId(_id) && typeof _id === "string") {
				id = this.convertToMongoId(_id);
			}
			const result = await this.model.findById(id, select);
			if (!result || _.isEmpty(result)) {
				return {};
			}
			const data = result.toObject();
			if (data && data.isDelete && !isWithOutCheckDelete) {
				return {};
			}
			return data ? data : {};
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	public async listPaging(
		filter: object,
		sort: object,
		pageIndex: number = 0,
		limit: number = 20,
		select: object = {},
	) {
		if (_.isEmpty(sort)) {
			sort = { createdAt: -1 };
		}
		if (!filter) {
			filter = {};
		}
		if (Number.isNaN(pageIndex)) {
			pageIndex = 0;
		}
		if (Number.isNaN(limit)) {
			limit = 20;
		}
		pageIndex = pageIndex >= 1 ? pageIndex - 1 : 0;
		if (!pageIndex || pageIndex < 0) {
			pageIndex = 0;
		}
		if (!limit || limit < 0 || limit > 1000) {
			limit = 20;
		}
		const options = {
			select,
			offset: pageIndex * limit,
			limit,
			sort,
		};
		return await this.model.paginate(filter, options);
	}

	public async findOne(
		filter: object | any,
		isWithOutCheckDelete: boolean = false,
		select: object = {},
	) {
		if (!isWithOutCheckDelete) {
			filter.isDelete = { $ne: true };
		}
		let result = await this.model.findOne(filter, select);
		if (!result || _.isEmpty(result)) {
			return {};
		}
		const data = result.toObject();
		if (data && data.isDelete && !isWithOutCheckDelete) {
			return {};
		}
		return data ? data : {};
	}

	public async create(data: object) {
		return await this.model.create(data);
	}

	public async update(ent: { _id: string | any }) {
		const filter = {
			_id: ent._id,
		};
		const result = await this.model.updateOne(filter, ent);
		return {
			ok: result.acknowledged ? 1 : 0,
			n: result.matchedCount,
			nModified: result.modifiedCount,
		};
	}

	public async delete(ent: { _id: string | any }) {
		const filter = {
			_id: ent._id,
		};
		const result = await this.model.deleteOne(filter);
		return {
			n: result.acknowledged ? 1 : 0,
			ok: result.acknowledged ? 1 : 0,
			deletedCount: result.deletedCount,
		};
	}

	convertToMongoId(params: any) {
		if (_.isArray(params)) {
			return params.map((id) => new mongoose.Types.ObjectId(id));
		}
		if (_.isString(params)) {
			return new mongoose.Types.ObjectId(params);
		}
		return params;
	}
}

export = AccountModel;

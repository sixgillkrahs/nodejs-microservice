import { Context, LoggerInstance } from "moleculer";
import { MainProcess, Response } from "../data-transfers";
import { INTERNAL_CODES, STATE } from "goopay-library/defined/state-code";
import { AccountModel } from "../model";
import { RequestHelper, ResponseHelper } from "goopay-library/helpers";
import { AccountEntity } from "../data-transfers/entities";

class AccountLogic {
	private readonly accountModel: AccountModel;
	constructor(mainProcess: MainProcess) {
		this.accountModel = mainProcess.models.AccountModel;
	}

	public async createAccount(context: Context): Promise<Response> {
		try {
			const params: any = RequestHelper.getParams(context);
			const langCode: any = RequestHelper.getLangCode(context);
			const { email, userId, password }: { email: string; userId: string; password: string } =
				params;
			if (!params || !email || !userId || !password) {
				return ResponseHelper.resFailed(
					INTERNAL_CODES.MISSING_PARAM,
					STATE.FAILED,
					langCode,
				);
			}
			const newAccount: AccountEntity | any = {
				email: email,
				userId: userId,
				password: password,
				isActive: true,
				isVerified: false,
				createdAt: new Date(),
			};

			const res: AccountEntity | any = await this.accountModel.create(newAccount);
			return ResponseHelper.resOK(res);
		} catch (error) {
			return ResponseHelper.resFailed(INTERNAL_CODES.FAILED, STATE.FAILED);
		}
	}

	public async getAllAccount(context: Context): Promise<Response> {
		try {
			const params = RequestHelper.getParams(context);
			const res = await this.accountModel.getAll({});
			return ResponseHelper.resOK(res);
		} catch (error) {
			return ResponseHelper.resFailed(INTERNAL_CODES.FAILED, STATE.FAILED);
		}
	}

	public async getAccountPaging(context: Context): Promise<Response> {
		try {
			const params = RequestHelper.getParams(context);
			let filter: { [k: string]: any } = {};
			const sort: any = {};
			const res = await this.accountModel.listPaging(filter, sort);
			return ResponseHelper.resOK(res);
		} catch (error) {
			return ResponseHelper.resFailed(INTERNAL_CODES.FAILED, STATE.FAILED);
		}
	}
}

export = AccountLogic;

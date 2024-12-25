import { Document } from "mongoose";

interface AccountEntity extends Document {
	email: string;
	userId: string;
	phone: string;
	state: string;
	password: string;
	passwordHistory: object;
	isActive: boolean;
	isVerified: boolean;
	isDelete: boolean;
	lockUntil?: Date;
	lastUpdatePassword?: Date;
	createdAt: Date;
	lastUpdatedAt?: Date;
}

export = AccountEntity;

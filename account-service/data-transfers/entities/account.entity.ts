import { Document } from "mongoose";

interface AccountEntity extends Document {
	email: string;
	userId: string;
	password: string;
	isActive: boolean;
	isVerified: boolean;
	lockUntil?: Date;
	lastUpdatePassword?: Date;
	createdAt: Date;
	lastUpdatedAt?: Date;
}

export = AccountEntity;

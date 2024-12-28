import { Document } from "mongoose";

interface UserAuthEntity extends Document {
  email: string;
  userType: string;
  userId: string;
  social: object;
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

export = UserAuthEntity;

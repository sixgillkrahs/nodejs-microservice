import { Document } from "mongoose";

interface UserEntity extends Document {
  fullName: string;
  avatar: string;
  dob: string;
  email: string;
  gender: string;
  address: any;
  note: object;
  userType: string;
  phone: string;
  phonePrefix: string;
  isActive: boolean;
  isDelete: boolean;
  createdAt: Date;
  lastUpdatedAt?: Date;
}

export = UserEntity;

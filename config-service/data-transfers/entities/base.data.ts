import { Document } from "mongoose";

interface BaseEntity extends Document {
  key: string;
  value: string;
}

export = BaseEntity;

import { Document, Schema, model, models } from "mongoose";
import { boolean } from "zod";

export interface ILocation extends Document {
  _id: string;
  name: string;
  address: string;
  description: string;
  capacity?: number;
  date?: Date;
  oneTimeEvent?: boolean;
  weekDay?: string;
  time?: string;
  url?: string;
}

const LocationSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  capacity: { type: Number },
  date: { type: Date },
  url: { type: String },
  weekDay: { type: String },
  time: { type: String },
  oneTimeEvent: { type: boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Location = models.Location || model("Location", LocationSchema);

export default Location;

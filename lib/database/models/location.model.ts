import { Document, Schema, model, models } from "mongoose";

export interface ILocation extends Document {
  _id: string;
  name: string;
  address: string;
  description: string;
  capacity?: number;
  availableDates: Date[];
  url?: string;
}

const LocationSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  capacity: { type: Number },
  availableDates: [{ type: Date, required: true }],
  url: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Location = models.Location || model("Location", LocationSchema);

export default Location;

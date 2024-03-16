import { Schema, model, models, Document, Types } from "mongoose";

export interface IGameEvent extends Document {
  _id: string;
  gameId: number;
  description?: string;
  createdAt?: Date;
  eventDate?: Date;
  isPrivate?: boolean;
  privateLocation?: string;
  playersCount: number;
  location?: {
    _id: string;
    name: string;
    address: string;
    availableDates: Date[];
  };
  organizer: { _id: string; firstName: string; lastName: string };
  players: [{ _id: string; firstName: string; lastName: string }];
}

const GameEventSchema = new Schema({
  gameId: { type: Number, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  eventDate: { type: Date, default: Date.now },
  isPrivate: { type: Boolean, default: false },
  privateLocation: { type: String },
  playersCount: { type: Number, required: true },
  players: [{ type: Schema.Types.ObjectId, ref: "User" }],
  location: { type: Schema.Types.ObjectId, ref: "Location" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const GameEvent = models.GameEvent || model("GameEvent", GameEventSchema);

export default GameEvent;

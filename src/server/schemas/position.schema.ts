import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const positionSchema = new Schema<any>({
   position: String,
   card: { type: Schema.Types.ObjectId, ref: 'Card' },
});

export const PositionModel = model('Center', positionSchema);
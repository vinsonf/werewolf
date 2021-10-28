import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const positionSchema = new Schema({
    position: String,
    card: { type: Schema.Types.ObjectId, ref: 'Card' },
});
export const PositionModel = model('Center', positionSchema);
//# sourceMappingURL=position.schema.js.map
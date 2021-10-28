import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const cardSchema = new Schema({
    title: String,
    description: String,
});
export const CardModel = model('Card', cardSchema);
//# sourceMappingURL=card.schema.js.map
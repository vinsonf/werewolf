import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const playerSchema = new Schema<any>({
   socketId: String,
   playerName: String,
   card: { type: Schema.Types.ObjectId, ref: 'Card' },
});

export const PlayerModel = model('Player', playerSchema);
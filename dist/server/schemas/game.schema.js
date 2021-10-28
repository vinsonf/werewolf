import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const gameSchema = new Schema({
    pin: String,
    cards: [{ type: mongoose.Types.ObjectId, ref: 'Card' }],
    players: [{ type: mongoose.Types.ObjectId, ref: 'Player' }],
});
export const GameModel = model('Game', gameSchema);
//# sourceMappingURL=game.schema.js.map
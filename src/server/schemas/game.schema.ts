import mongoose from 'mongoose';
const {Schema, model} = mongoose;

interface Game {
    pin: string;
    players: mongoose.Types.ObjectId[];
    cards: mongoose.Types.ObjectId[];
}

const gameSchema = new Schema<Game>({
    pin: String,
    cards: [{ type: mongoose.Types.ObjectId, ref: 'Card' }],
    players: [{ type: mongoose.Types.ObjectId, ref: 'Player' }],
});

export const GameModel = model('Game', gameSchema);